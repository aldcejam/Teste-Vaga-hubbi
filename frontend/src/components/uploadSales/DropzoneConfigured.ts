import { uniqueId } from "lodash";
import { useDropzone } from "react-dropzone";

interface DropzoneConfiguredProps {
    setFiles: React.Dispatch<React.SetStateAction<any>>;
}

interface DropzoneConfiguredReturn {
    getRootProps: any;
    getInputProps: any;
    isDragAccept: boolean;
    isDragReject: boolean;
}

export const DropzoneConfigured = ({setFiles}: DropzoneConfiguredProps):DropzoneConfiguredReturn => {
    const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
        maxFiles: 1,
        maxSize: 2500000,
        accept: {
            ".txt*": [],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) => ({
                    file,
                    size: file.size / 1000000,
                    id: uniqueId(),
                    preview: URL.createObjectURL(file),
                    name: file.name,
                    progress: 0,
                    uploaded: false,
                    error: false,
                    url: null,
                }))
            );
        },
    });

    return {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
    }

}

