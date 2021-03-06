import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {getPluginBoardUserData, setPluginBoardUserData, watchPluginBoardUserData} from "@whiteboards-io/plugins";
import {useAsync} from "react-async-hook";

export default function Sidebar() {
    const savedData = useAsync(() => {
        return getPluginBoardUserData();
    }, []);

    if (savedData.loading) {
        return null;
    }

    return <>
        <h1 style={{margin: "0px 0 0 40px"}}>Notepad</h1>
        <CKEditor
            editor={ClassicEditor}
            data={savedData.result?.data}
            onReady={editor => {
                watchPluginBoardUserData(pluginData => {
                    if (editor.getData() !== pluginData.data) {
                        console.log("CHANGE", pluginData.data);
                    }
                })
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setPluginBoardUserData({data});
            }}
            onBlur={(event, editor) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />
    </>;
}