interface ISnackbarData {
    open: boolean,
    severity: "success" | "info" | "warning" | "error",
    closeSnackbar: () => void,
    msg: string,
}

export default ISnackbarData;