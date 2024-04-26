const si = require('systeminformation');
const axios = require('axios');
const moment = require('moment')

// Função para obter informações do sistema e enviar para o servidor
async function sendSystemInfo() {
    try {

        const cpuTemp = await si.cpuTemperature();
        const cpuSpeed = await si.cpuCurrentSpeed();
        const gpu = await si.graphics();
        const memory = await si.currentLoad();
        
        console.log("CPU Temperatura    : " + cpuTemp.main);
        console.log("CPU Clock          : " + cpuSpeed.avg);

        // Verificar se todas as propriedades existem antes de acessá-las
        if (cpuTemp.main && gpu && cpuSpeed.avg) {
            // Construir objeto com as informações
            const systemInfo = {
                cpuTemp: cpuTemp.main,
                cpuClock: cpuSpeed.avg,
            };

            // Enviar informações para o servidor
            const response = await axios.post('https://pc-monitoring-augmented-reality-production.up.railway.app/inserirDados', systemInfo);

            console.log('Informações enviadas com sucesso:\n', response.data);
        } else {
            console.error('Algumas informações do sistema estão ausentes. Não foi possível enviar os dados.');
        }
    } catch (error) {
        console.error('Erro ao obter informações do sistema ou enviar para o servidor:', error);
    }
}

// Chamar a função a cada intervalo de tempo desejado
const interval = setInterval(sendSystemInfo, 5000); // A cada 5 segundos (5000 milissegundos)
