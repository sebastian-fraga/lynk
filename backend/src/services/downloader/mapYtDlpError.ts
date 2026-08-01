const ERROR_PATTERNS = [
    //INSTAGRAM
    {
        match: /instagram sent an empty media response|instagram api is not granting access/i,
        message:
            "No se pudo encontrar este contenido en Instagram. Verificá que el link esté completo y sea correcto.",
    },
    {
        match: /private account|this account is private/i,
        message: "Esta cuenta es privada y su contenido no se puede descargar.",
    },
    {
        match: /login required|rate-limit reached/i,
        message:
            "Instagram está limitando el acceso en este momento. Intentá nuevamente más tarde.",
    },
    {
        match: /only available for registered users who follow this account/i,
        message:
            "Este contenido es privado y solo lo pueden ver los seguidores de la cuenta.",
    },
    {
        match: /instagram sent an empty media response|instagram api is not granting access/i,
        message:
            "No se pudo encontrar este contenido en Instagram. Verificá que el link esté completo y sea correcto.",
    },
    {
        match: /private account|this account is private/i,
        message: "Esta cuenta es privada y su contenido no se puede descargar.",
    },

    // YOUTUBE
    {
        match: /video unavailable/i,
        message: "Este video no está disponible o fue eliminado.",
    },
    {
        match: /private video/i,
        message: "Este video es privado y no se puede descargar.",
    },
    {
        match: /sign in to confirm you.?re not a bot|sign in to confirm your age/i,
        message:
            "YouTube requiere verificación adicional para este video. Intentá con otro link.",
    },
    {
        match: /this video is only available to registered users/i,
        message:
            "Este video requiere inicio de sesión y no se puede descargar.",
    },
    {
        match: /age.?restricted/i,
        message:
            "Este video tiene restricción de edad y no se puede descargar.",
    },
    {
        match: /copyright/i,
        message:
            "Este video no está disponible por motivos de derechos de autor.",
    },
    {
        match: /this live event will begin in|premieres in/i,
        message:
            "Este contenido todavía no está disponible (evento en vivo o estreno programado).",
    },
    {
        match: /video is no longer available because the uploader has closed their account/i,
        message:
            "Este video ya no está disponible porque la cuenta fue eliminada.",
    },

    // GENÉRICOS
    {
        match: /unsupported url|no video formats found|unable to extract/i,
        message: "No se pudo procesar este link. Verificá que sea correcto.",
    },
    {
        match: /http error 429|too many requests/i,
        message:
            "Estamos recibiendo muchas solicitudes. Esperá un momento y volvé a intentar.",
    },
    {
        match: /http error 403|forbidden/i,
        message:
            "No se pudo acceder a este contenido. Puede ser temporal, intentá más tarde.",
    },
    {
        match: /http error 404|not found/i,
        message: "El contenido no fue encontrado. Puede haber sido eliminado.",
    },
    {
        match: /http error 5\d{2}/i,
        message:
            "El servicio de origen está teniendo problemas. Intentá más tarde.",
    },
    {
        match: /timed? out|timeout/i,
        message: "La operación tardó demasiado. Intentá nuevamente.",
    },
    {
        match: /network|getaddrinfo|econnrefused|enotfound|temporary failure in name resolution/i,
        message:
            "Hubo un problema de conexión al procesar el video. Intentá nuevamente.",
    },
    {
        match: /ffmpeg/i,
        message: "Ocurrió un error al procesar el archivo. Intentá nuevamente.",
    },
    {
        match: /no space left/i,
        message: "No hay espacio disponible en el servidor. Intentá más tarde.",
    },
    {
        match: /post not found|content unavailable/i,
        message: "Este contenido no está disponible o fue eliminado.",
    },
];

export function mapYtDlpError(rawMessage: string): string {
    if (!rawMessage) {
        return "Ocurrió un error inesperado al procesar el contenido.";
    }

    const matched = ERROR_PATTERNS.find((pattern) =>
        pattern.match.test(rawMessage),
    );

    if (matched) return matched.message;

    return "No se pudo procesar este contenido. Verificá el link e intentá nuevamente.";
}
