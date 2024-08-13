import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Colors } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const langChart = (type: string, names: string[], values:number[]) => {
  const data = {
    labels: names,
    datasets: [
      {
        data: values,
        borderWidth: 1,
      },
    ],
  };

  if (type == 'Pie'){
    return (<Pie data={data} />)
    }
  else{
    return (<Bar data={data}/>)
  }
}

export default langChart
