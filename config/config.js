module.exports = {

    apiBaseUrl: process.env.API_BASE_URL,
    
    postgres: {
        url: process.env.POSTGRES_CONNECTION
    },

    stripe: {
        publicKey: process.env.STRIPE_PUBLIC_KEY,
        secretKey: process.env.STRIPE_SECRET_KEY
    }

}