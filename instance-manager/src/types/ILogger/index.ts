interface ILogger {
    info: (s: string) => void;
    warning: (s: string) => void;
    error: (s: string) => void;
}

export default ILogger;