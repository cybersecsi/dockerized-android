import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

interface CustomDropzoneProps {
    setFileData: (file: any) => void,
}

const CustomDropzone = (props: CustomDropzoneProps) => {

    const { setFileData } = props;

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        setFileData(file);
      }, [setFileData])

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});

    const files = acceptedFiles.map((file: any) => {
        return (
            <li key={file.path}>
            {file.path} - {file.size} bytes
            </li>
        )
    });

    return (  
    <section className="container">
        <div {...getRootProps({className: 'custom-dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
        </aside>
    </section>
    );
}

export default CustomDropzone;