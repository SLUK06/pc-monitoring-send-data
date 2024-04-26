const si = require('systeminformation');
const axios = require('axios');

// Função para obter informações do sistema e enviar para o servidor
async function sendSystemInfo() {
    try {
        //const data = await si.getAllData();
        //const { main, cpu, graphics } = data;
        //console.log(main.memClock);
        var cpuTemp = si.cpuTemperature();
        console.log("CPU Temperatura    : " + cpuTemp.main);
        //console.log(cpu.speed);
        //console.log(graphics.temperatureGpu);

        // Verificar se todas as propriedades existem antes de acessá-las
        if (cpuTemp && graphics.temperatureGpu && cpu.speed /*&& main.memClock*/) {
            // Construir objeto com as informações
            const systemInfo = {
                cpuTemp: cpu.temperature,
                gpuTemp: graphics.temperatureGpu,
                cpuClock: cpu.speed,
                memoryClock: main.memClock
            };

            // Enviar informações para o servidor
            const response = await axios.post('https://pc-monitoring-augmented-reality-production.up.railway.app/inserirDados', systemInfo);

            console.log('Informações enviadas com sucesso:', response.data);
        } else {
            console.error('Algumas informações do sistema estão ausentes. Não foi possível enviar os dados.');
        }
    } catch (error) {
        console.error('Erro ao obter informações do sistema ou enviar para o servidor:', error);
    }
}

// Chamar a função a cada intervalo de tempo desejado
const interval = setInterval(sendSystemInfo, 5000); // A cada 5 segundos (5000 milissegundos)
