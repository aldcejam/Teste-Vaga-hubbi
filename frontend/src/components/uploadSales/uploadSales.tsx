"use client"
import { useEffect, useState } from "react";
import styled from "./styled.module.scss"
import { Thumb } from "./thumb";
import { useApiDataStateContext } from "@/context/apiDataContext";
import { SendSaleFile } from "@/app/api/SendSaleFile";
import { DropzoneConfigured } from "./DropzoneConfigured";

export interface UploadedFile {
    file: {
        path: string;
    };
    size: number;
    id: string;
    preview: string;
    name: string;
    progress: number;
    uploaded: boolean;
    error: boolean;
    url: string | null;
}

export const UploadSales = () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const { affiliateSelected, retailerSelected } = useApiDataStateContext()
    const [sendFileResulted, setSendFileResulted] = useState();

    console.log(sendFileResulted);

    const [send, setSend] = useState(false);

    useEffect(() => {
        if (!send) return; 
        SendSaleFile({
            retailerId: retailerSelected.state?.id,
            affiliateId: affiliateSelected.state?.id,
            file: files[0].file,
            setState: setSendFileResulted,
        });
        setSend(false);
    }, [send]);
     

    const { getInputProps, getRootProps, isDragAccept, isDragReject } = DropzoneConfigured({
        setFiles
    });
 
    const CleanFiles = () => {
        setFiles([]);
    };


    const RederizeUserMovimentSituation = () => {
        if (isDragAccept) {
            return <p>Solte o arquivo</p>;
        } else if (isDragReject) {
            return <p>arquivo não permitido</p>;
        } else {
            return <p>Arraste a imagem ou clique para enviar</p>;
        }
    };

    return (
        <div className={styled["input-upload"]}
            data-dragaccept={isDragAccept.toString()}
            data-dragreject={isDragReject.toString()}
        >
            <div {...getRootProps({ className: styled["dropzone"] })}>
                <input name="archive" {...getInputProps()} />
                <div className={styled["label"]}>
                    {RederizeUserMovimentSituation()}
                </div>
            </div>
            {
                files.length > 0 ?
                    <Thumb files={files} CleanFiles={CleanFiles} /> : null
            }
            {
                files.length > 0 ?
                    <button
                        className={styled["button-send"]}
                        onClick={() => setSend(true)}
                    >
                        Enviar
                    </button> : null
            }
        </div>
    );
}