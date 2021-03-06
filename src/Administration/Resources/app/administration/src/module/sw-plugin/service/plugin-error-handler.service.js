function StoreError(title, message) {
    return {
        title,
        message
    };
}

const errorCodes = {
    FRAMEWORK__PLUGIN_NO_PLUGIN_FOUND_IN_ZIP: new StoreError(
        'sw-plugin.errors.titleUploadFailure',
        'sw-plugin.errors.messageUploadFailureNoPluginFoundInZipFile'
    ),
    FRAMEWORK__PLUGIN_NOT_A_ZIP_FILE: new StoreError(
        'sw-plugin.errors.titleUploadFailure',
        'sw-plugin.errors.messageUploadFailureNotAZipFile'
    ),
    FRAMEWORK__PLUGIN_EXTRACTION_FAILED: new StoreError(
        'sw-plugin.errors.titleUploadFailure',
        'sw-plugin.errors.messageUploadFailureUnzipFailed'
    ),
    FRAMEWORK__STORE_INVALID_CREDENTIALS: new StoreError(
        'sw-plugin.errors.titleLoginDataInvalid',
        'sw-plugin.errors.messageLoginDataInvalid'
    ),
    FRAMEWORK__STORE_LICENSE_DOMAIN_IS_MISSING: new StoreError(
        'sw-plugin.errors.titleStoreHostMissing',
        'sw-plugin.errors.messageStoreLicenseDomainMissing'
    ),
    FRAMEWORK__STORE_NOT_AVAILABLE: new StoreError(
        'sw-plugin.errors.titleStoreNotAvailable',
        'sw-plugin.errors.messageStoreNotAvailable'
    ),
    FRAMEWORK__PLUGIN_BASE_CLASS_NOT_FOUND: new StoreError(
        'sw-plugin.errors.titlePluginBaseClassNotFound',
        'sw-plugin.errors.messagePluginBaseClassNotFound'
    )
};

function getNotification(error) {
    if (error.code === 'FRAMEWORK__STORE_ERROR') {
        return mapErrorWithDocsLink(error);
    }

    if (typeof errorCodes[error.code] !== 'undefined') {
        return {
            title: errorCodes[error.code].title,
            message: errorCodes[error.code].message
        };
    }

    return {
        title: 'sw-plugin.errors.titleGenericFailure',
        message: 'sw-plugin.errors.messageGenericFailure'
    };
}

function mapErrorWithDocsLink({ title, detail: message, meta }) {
    if (meta && typeof meta.documentationLink === 'string') {
        return {
            title,
            message,
            parameters: {
                documentationLink: meta.documentationLink
            }
        };
    }

    return {
        title,
        message
    };
}

function mapErrors(errors) {
    return errors.map(getNotification);
}

export default {
    mapErrors
};
