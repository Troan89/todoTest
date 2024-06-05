import {ChangeEvent, useState} from "react"
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
    style?: React.CSSProperties
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField style={props.style} variant={"outlined"} onBlur={activeViewMode} value={title} autoFocus
                     onChange={onChangeTitleHandler}/>
        : <span style={props.style} onDoubleClick={activeEditMode}>{props.title}</span>
}