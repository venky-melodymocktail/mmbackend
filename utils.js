const getMongoConnectionString = (config = configs.get('db')) => {
    var connectionString = 'mongodb://';
    var credentials;

    if (config.authEnabled === true) {
        credentials = encodeURIComponent(config.userName) + ":" + encodeURIComponent(config.password) + "@";
        connectionString += credentials;
    }
    else if (config.kerberosEnabled === true) {
        credentials = encodeURIComponent(config.kerberosPrincipal) + "@";
        connectionString += credentials;
    }

    if (config.replEnabled) {
        if (config.hosts.length !== config.ports.length) {
            var err = new Error('Hosts and ports don\'t match in config');
            err.name = 'InvalidConfig';

            throw err;
        }

        connectionString += config.hosts.map(function (host, ind) {
            return host + ':' + config.ports[ind];
        }).join(',');

        connectionString += '/';
        connectionString += config.database;
        connectionString += "?w=" + config.writeconcern;
        connectionString += "&replicaSet=" + config.replName;

        if (config.authEnabled === true) {
            connectionString += "&" + "authSource=" + config.authSource;
            if (config.authMechanism) {
                connectionString += "&" + "authMechanism=" + config.authMechanism;
            }
        }
    } else {
        connectionString += config.host;
        connectionString += ':';
        connectionString += config.port;
        connectionString += '/';
        connectionString += config.database;
        if (config.authEnabled === true) {
            connectionString += "?" + "authSource=" + config.authSource;
            if (config.authMechanism) {
                connectionString += "&" + "authMechanism=" + config.authMechanism;
            }
        }
    }
    // console.log(connectionString, '123456')
    return connectionString;
}

export default {
    getMongoConnectionString
}