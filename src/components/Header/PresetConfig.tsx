import React, { useCallback } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { DownloadIcon, UploadIcon } from '@radix-ui/react-icons'
import { useSettings } from '../Settings/useSettings.ts'

const PRESET_EXTENSION = 'gss'

export const PresetConfig = React.memo(() => {
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const {
        preset,
        setSettings,
        scale: { noteNameMap },
    } = useSettings()

    const onDownload = () => {
        const blob = new Blob(
            [JSON.stringify({ ...preset, theme: undefined })],
            {
                type: `application/${PRESET_EXTENSION}`,
            }
        )
        const url = URL.createObjectURL(blob)

        const downloadLink = document.createElement('a')
        const rootNoteName = noteNameMap[preset.scale.root]

        downloadLink.download = `${preset.scale.type} (${rootNoteName}).${PRESET_EXTENSION}`
        downloadLink.href = url
        downloadLink.style.display = 'none'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)

        URL.revokeObjectURL(url)
    }

    const onUpload = () => {
        fileInputRef.current?.click()
    }

    const uploadFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.currentTarget.files?.[0] // Get the file
            if (file) {
                const reader = new FileReader()
                const onError = (e: unknown) => {
                    // TODO: add a toaster
                    console.log(e)
                }
                reader.onload = () => {
                    const result = reader.result
                    try {
                        if (typeof result !== 'string') {
                            onError(
                                `Error while reading: expected string, received: ${result === null ? 'null' : result}`
                            )
                            return
                        }
                        const parsedPreset = JSON.parse(result)
                        setSettings((prev) => ({
                            ...parsedPreset,
                            theme: prev.theme,
                        }))
                    } catch (e) {
                        onError(e)
                    }
                }
                reader.onerror = () => {
                    onError("File couldn't be read")
                }
                reader.readAsText(file)
            } else {
                console.log('No file selected')
            }
        },
        [setSettings]
    )

    return (
        <Flex gap="3" height="100%" align="center">
            <Button color="gray" variant="ghost" onClick={onDownload}>
                <DownloadIcon />
                Export Settings
            </Button>
            |
            <Button color="gray" variant="ghost" onClick={onUpload}>
                <UploadIcon />
                Import Settings
            </Button>
            <input
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
                id="jsonFileInput"
                accept={`.${PRESET_EXTENSION}`}
                onChangeCapture={uploadFile}
            />
        </Flex>
    )
})
