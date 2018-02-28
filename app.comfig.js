module.exports = {
    apps : [{
        name        : "landing",
        script      : "./app.js",
        watch       : true,
        env: {
            "NODE_ENV": "production",
        },
        env_production : {
            "NODE_ENV": "production"
        }
    }]
};