import * as React from 'react';
import { PropTypes } from 'react';
import { Link } from 'react-router';
import { IGrupo } from '../../types';

// import '../../../public/js/materialize.js';
// import '../../../public/js/materialize.min.js';

import { BarChart, Bar, ZAxis, AreaChart, Area, Scatter, ScatterChart, CartesianGrid} from '../../../node_modules/recharts';
import { XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from '../../../node_modules/recharts';
import { Tabs, Tab } from '../../../node_modules/react-materialize';
import { Radar, RadarChart } from '../../../node_modules/recharts';
import { PolarGrid, PolarAngleAxis, PolarRadiusAxis, ReferenceLine } from '../../../node_modules/recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS2 = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];
const tipos = [{ tipo: 'Aceptación', ab: 'A'}, { tipo: 'Afrontamiento Directo', ab: 'AD'} , { tipo: 'Análisis de las Emociones', ab: 'AE'},
 { tipo: 'Búsqueda de Soporte Emocional', ab: 'BSE'}, { tipo: 'Búsqueda de Soporte Social', ab: 'BSE'} , { tipo: 'Conductas Inadecuadas', ab: 'CI'},
  { tipo: 'Distracción', ab: 'D'}, { tipo: 'Negación', ab: 'N'}, { tipo: 'Planificación de Actividades', ab: 'PA'}, { tipo: 'Retracción del Afrontamiento', ab: 'RA'},
   { tipo: 'Reinterpretación Positiva de la Experiencia', ab: 'RPE'} , { tipo: 'Retomo a la Religión' , ab: 'RR'}, { tipo: 'Superación de Actividades Competitivas' , ab: 'SAC'}];
const tipos2 = [{ tipo: 'Sinceridad', ab: 'X'}, { tipo: 'Deseabilidad Social', ab: 'Y'}, { tipo: 'Autodescalificación', ab: 'Z'}, { tipo: 'Esquizoide', ab: '1'},
   { tipo: 'Evitativo', ab: '2'}, { tipo: 'Dependiente', ab: '3'}, { tipo: 'Histriónico', ab: '4'} , { tipo: 'Narcisista', ab: '5'},
   { tipo: 'Antisocial', ab: '6A'}, { tipo: 'Agresivo-sádico', ab: '6B'}, { tipo: 'Compulsivo', ab: '7'}, { tipo: 'Pasivo-agresivo', ab: '8A'},
   { tipo: 'Autoderrotista', ab: '8B'}, { tipo: 'Esquizotípico' , ab: 'S'}, { tipo: 'Borderline' , ab: 'C'}, { tipo: 'Paranoide' , ab: 'P'},
   { tipo: 'Ansiedad' , ab: 'A'}, { tipo: 'Somatoformo' , ab: 'H'}, { tipo: 'Bipolar' , ab: 'N'}, { tipo: 'Distimia' , ab: 'D'},
   { tipo: 'Dependencia de alcohol' , ab: 'B'}, { tipo: 'Dependencia de drogas' , ab: 'T'}, { tipo: 'Desorden del pensamiento' , ab: 'SS'},
   { tipo: 'Depresión mayor' , ab: 'CC'}, { tipo: 'Desorden delusional' , ab: 'PP'}];
   const tipos3 = [{ tipo: 'Intrapersonal', ab: 'IA'}, { tipo: 'Conocimiento Emocional de si mismo', ab: 'CM'}, { tipo: 'Asertividad', ab: 'AS'}, { tipo: 'Autoconcepto', ab: 'AC'}, { tipo: 'Autorrealizacion', ab: 'AR'}, { tipo: 'Independencia', ab: 'IN'},
  { tipo: 'Interpersonal', ab: 'IE'}, { tipo: 'Empatia', ab: 'EM'}, { tipo: 'Relaciones Interpersonales', ab: 'RI'} , { tipo: 'Responsabilidad Social', ab: 'RS'},
  { tipo: 'Adaptibilidad', ab: 'AD'}, { tipo: 'Solucion de Problemas', ab: 'SP'}, { tipo: 'Prueba de la realidad', ab: 'PR'}, { tipo: 'Flexibilidad', ab: 'FL'},
  { tipo: 'Manejo de Estres' , ab: 'MT'}, { tipo: 'Tolerancia al Stress' , ab: 'ME'}, { tipo: 'Control de Impulsos' , ab: 'CI'},
  { tipo: 'Estado de Animo General' , ab: 'EA'}, { tipo: 'Felicidad' , ab: 'FE'}, { tipo: 'Optimismo' , ab: 'OP'}, { tipo: 'General' , ab: 'G'}];
let total1 = 0;
let total2 = 0;
let total3 = 0;
let total4 = 0;
let total5 = 0;
let total6 = 0;
let total7 = 0;
let total8 = 0;
let total9 = 0;
let total10 = 0;
let total11 = 0;
let total12 = 0;
let total13 = 0;
let valoresGen = [];
let valoresFin = [];
const valores1 = [];
const valores2 = [];
const valores3 = [];
const valores4 = [];
const valores5 = [];
const valores6 = [];
const valores7 = [];
const valores8 = [];
const valores9 = [];
const valores10 = [];
const valores11 = [];
const valores12 = [];
const valores13 = [];
let totX = 0;
let totY = 0;
let totZ = 0;
let tot1 = 0;
let tot2 = 0;
let tot3 = 0;
let tot4 = 0;
let tot5 = 0;
let tot6A = 0;
let tot6B = 0;
let tot7 = 0;
let tot8A = 0;
let tot8B = 0;
let totS = 0;
let totC = 0;
let totP = 0;
let totA = 0;
let totH = 0;
let totN = 0;
let totD = 0;
let totB = 0;
let totT = 0;
let totSS = 0;
let totCC = 0;
let totPP = 0;
const valX = [];
const valY = [];
const valZ = [];
const val1 = [];
const val2 = [];
const val3 = [];
const val4 = [];
const val5 = [];
const val6A = [];
const val6B = [];
const val7 = [];
const val8A = [];
const val8B = [];
const valS = [];
const valC = [];
const valP = [];
const valA = [];
const valH = [];
const valN = [];
const valD = [];
const valB = [];
const valT = [];
const valSS = [];
const valCC = [];
const valPP = [];
let valoresMillon = [];
let totalIA = 0;
 let totalA1 = 0;
 let totalA2 = 0;
 let totalA3 = 0;
 let totalA4 = 0;
 let totalA5 = 0;
 let totalIE = 0;
 let totalB1 = 0;
 let totalB2 = 0;
 let totalB3 = 0;
 let totalAD = 0;
 let totalC1 = 0;
 let totalC2 = 0;
 let totalC3 = 0;
 let totalMT = 0;
 let totalD1 = 0;
 let totalD2 = 0;
 let totalEA = 0;
 let totalE1 = 0;
 let totalE2 = 0;
 let totalG = 0;
 const valIA = [];
 const valA1 = [];
 const valA2 = [];
 const valA3 = [];
 const valA4 = [];
 const valA5 = [];
 const valIE = [];
 const valB1 = [];
 const valB2 = [];
 const valB3 = [];
 const valAD = [];
 const valC1 = [];
 const valC2 = [];
 const valC3 = [];
 const valMT = [];
 const valD1 = [];
 const valD2 = [];
 const valEA = [];
 const valE1 = [];
 const valE2 = [];
 const valG = [];
 let valoresIceB = [];
const CustomTooltip  = React.createClass({
  propTypes: {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
  },
  getIntroOfPage(label) {
      if (label === 'RA') {
        return 'Retracción del Afrontamiento';
      } else if (label === 'RR') {
        return 'Retomo a la Religión';
      } else if (label === 'PA') {
        return 'Planificación de Actividades';
      } else if (label === 'CI') {
        return 'Conductas Inadecuadas';
      } else if (label === 'A') {
        return 'Aceptación';
      } else if (label === 'SAC') {
        return 'Superación de Actividades Competitivas';
      } else if (label === 'BSS') {
        return 'Búsqueda de Soporte Social';
      } else if (label === 'D') {
        return 'Distracción';
      } else if (label === 'AE') {
        return 'Análisis de las Emociones';
      } else if (label === 'N') {
        return 'Negación';
      } else if (label === 'BSE') {
        return 'Búsqueda de Soporte Emocional';
      } else if (label === 'RPE') {
        return 'Reinterpretación Positiva de la Experiencia';
      } else if (label === 'AD') {
        return 'Afrontamiento Directo';
      }
  },

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className='custom-tooltip' style={{backgroundColor: 'white', padding: '5px'}}>
          <p className='label'>{`${label} : ${payload[0].value}`}</p>
          <p className='intro'>{this.getIntroOfPage(label)}</p>
        </div>
      );
    }

    return null;
  }
});

const CustomTooltip3  = React.createClass({
   propTypes: {
     type: PropTypes.string,
     payload: PropTypes.array,
     label: PropTypes.string,
   },
   getIntroOfPage(label) {
       if (label === 'IA') {
         return 'Intrapersonal';
       } else if (label === 'CM') {
         return 'Conocimiento Emocional de si mismo';
       } else if (label === 'AS') {
         return 'Asertividad';
       } else if (label === 'AC') {
         return 'Autoconcepto';
       } else if (label === 'AR') {
         return 'Autorrealizacion';
       } else if (label === 'IN') {
         return 'Independencia';
       } else if (label === 'IE') {
         return 'Interpersonal';
       } else if (label === 'EM') {
         return 'Empatia';
       } else if (label === 'RI') {
         return 'Relaciones Interpersonales';
       } else if (label === 'RS') {
         return 'Responsabilidad Social';
       } else if (label === 'AD') {
         return 'Adaptibilidad';
       } else if (label === 'SP') {
         return 'Solucion de Problemas';
       } else if (label === 'PR') {
         return 'Prueba de la realidad';
       } else if (label === 'FL') {
         return 'Flexibilidad';
       } else if (label === 'MT') {
         return 'Manejo de Estres';
       } else if (label === 'ME') {
         return 'Tolerancia al Stress';
       } else if (label === 'CI') {
         return 'Control de Impulsos';
       } else if (label === 'EA') {
         return 'Estado de Animo General';
       } else if (label === 'FE') {
         return 'Felicidad';
       } else if (label === 'OP') {
         return 'Optimismo';
       } else if (label === 'G') {
         return 'General';
       }
   },

   render() {
     const { active } = this.props;

     if (active) {
       const { payload, label } = this.props;
       return (
         <div className='custom-tooltip' style={{backgroundColor: 'white', padding: '10px'}}>
           <p className='label'>{`${label} : ${payload[0].value}`}</p>
           <p className='intro'>{this.getIntroOfPage(label)}</p>
         </div>
       );
     }
     return null;
   }
 });

export default ({grupo}: { grupo: IGrupo }) => (
  <section>
     {grupo.alumnos.map(alumno =>
  <div>
      <div>
         {alumno.resultados.map(resultado => {
             if (resultado.test === 'Test del Estres') {
            <div>{resultado.valores.map((valor, index) => {
                   if (valor.tipo === 'A') {
                       valores1.push(valor.value);
                       total1 = valores1.reduce((a, v) => a + v);
                       console.log(total1 / valores1.length);
                  } else if (valor.tipo === 'AD') {
                       valores2.push(valor.value);
                       total2 = valores2.reduce((a, v) => a + v);
                       console.log(total2 / valores2.length);
                  } else if (valor.tipo === 'AE') {
                       valores3.push(valor.value);
                       total3 = valores3.reduce((a, v) => a + v);
                       console.log(total3 / valores3.length);
                  } else if (valor.tipo === 'BSE') {
                       valores4.push(valor.value);
                       total4 = valores4.reduce((a, v) => a + v);
                       console.log(total4 / valores4.length);
                  } else if (valor.tipo === 'BSS') {
                       valores5.push(valor.value);
                       total5 = valores5.reduce((a, v) => a + v);
                       console.log(total5 / valores5.length);
                  } else if (valor.tipo === 'CI') {
                       valores6.push(valor.value);
                       total6 = valores6.reduce((a, v) => a + v);
                       console.log(total6 / valores6.length);
                  } else if (valor.tipo === 'D') {
                       valores7.push(valor.value);
                       total7 = valores7.reduce((a, v) => a + v);
                       console.log(total7 / valores7.length);
                  } else if (valor.tipo === 'N') {
                       valores8.push(valor.value);
                       total8 = valores8.reduce((a, v) => a + v);
                       console.log(total8 / valores8.length);
                  } else if (valor.tipo === 'PA') {
                       valores9.push(valor.value);
                       total9 = valores9.reduce((a, v) => a + v);
                       console.log(total9 / valores9.length);
                  } else if (valor.tipo === 'RPE') {
                       valores10.push(valor.value);
                       total10 = valores10.reduce((a, v) => a + v);
                       console.log(total10 / valores10.length);
                  } else if (valor.tipo === 'RR') {
                       valores11.push(valor.value);
                       total11 = valores11.reduce((a, v) => a + v);
                       console.log(total11 / valores11.length);
                  } else if (valor.tipo === 'RA') {
                       valores12.push(valor.value);
                       total12 = valores12.reduce((a, v) => a + v);
                       console.log(total12 / valores12.length);
                  } else if (valor.tipo === 'SAC') {
                        valores13.push(valor.value);
                       total13 = valores13.reduce((a, v) => a + v);
                       console.log(total13 / valores13.length);
                  }
            })}</div>;
                 valoresGen.push({val: Number((total1 / valores1.length).toFixed(2)) , tipo: 'A'});
                 valoresGen.push({val: Number((total2 / valores2.length).toFixed(2)) , tipo: 'AD'});
                 valoresGen.push({val: Number((total3 / valores3.length).toFixed(2)) , tipo: 'AE'});
                 valoresGen.push({val: Number((total4 / valores4.length).toFixed(2)) , tipo: 'BSE'});
                 valoresGen.push({val: Number((total5 / valores5.length).toFixed(2)) , tipo: 'BSS'});
                 valoresGen.push({val: Number((total6 / valores6.length).toFixed(2)) , tipo: 'CI'});
                 valoresGen.push({val: Number((total7 / valores7.length).toFixed(2)) , tipo: 'D'});
                 valoresGen.push({val: Number((total8 / valores8.length).toFixed(2)) , tipo: 'N'});
                 valoresGen.push({val: Number((total9 / valores9.length).toFixed(2)) , tipo: 'PA'});
                 valoresGen.push({val: Number((total10 / valores10.length).toFixed(2)) , tipo: 'RPE'});
                 valoresGen.push({val: Number((total11 / valores11.length).toFixed(2)) , tipo: 'RR'});
                 valoresGen.push({val: Number((total12 / valores12.length).toFixed(2)) , tipo: 'RA'});
                 valoresGen.push({val: Number((total13 / valores13.length).toFixed(2)) , tipo: 'SAC'});
                 console.log(valoresGen.slice(Math.max(valoresGen.length - 13)));
                 valoresFin = valoresGen.slice(Math.max(valoresGen.length - 13));
          } else if (resultado.test === 'Test de Millon') {
              <div>{resultado.valores.map((valor, index) => {
                   if (valor.tipo === 'X') {
                       valX.push(valor.value);
                       totX = valX.reduce((a, v) => a + v);
                              } else if (valor.tipo === 'Y') {
                       valY.push(valor.value);
                       totY = valY.reduce((a, v) => a + v);
                                    } else if (valor.tipo === 'Z') {
                       valZ.push(valor.value);
                       totZ = valZ.reduce((a, v) => a + v);
                                    } else if (valor.tipo === '1') {
                       val1.push(valor.value);
                       tot1 = val1.reduce((a, v) => a + v);
                                    } else if (valor.tipo === '2') {
                       val2.push(valor.value);
                       tot2 = val2.reduce((a, v) => a + v);
                                    } else if (valor.tipo === '3') {
                       val3.push(valor.value);
                       tot3 = val3.reduce((a, v) => a + v);
                                    } else if (valor.tipo === '4') {
                       val4.push(valor.value);
                       tot4 = val4.reduce((a, v) => a + v);
                                   } else if (valor.tipo === '5') {
                       val5.push(valor.value);
                       tot5 = val5.reduce((a, v) => a + v);
                                    } else if (valor.tipo === '6A') {
                       val6A.push(valor.value);
                       tot6A = val6A.reduce((a, v) => a + v);
                                    } else if (valor.tipo === '6B') {
                       val6B.push(valor.value);
                       tot6B = val6B.reduce((a, v) => a + v);
                                      } else if (valor.tipo === '7') {
                       val7.push(valor.value);
                       tot7 = val7.reduce((a, v) => a + v);
                                      } else if (valor.tipo === '8A') {
                       val8A.push(valor.value);
                       tot8A = val8A.reduce((a, v) => a + v);
                                      } else if (valor.tipo === '8B') {
                       val8B.push(valor.value);
                       tot8B = val8B.reduce((a, v) => a + v);
                                      } else if (valor.tipo === 'S') {
                        valS.push(valor.value);
                       totS = valS.reduce((a, v) => a + v);
                                       } else if (valor.tipo === 'C') {
                       valC.push(valor.value);
                       totC = valC.reduce((a, v) => a + v);
                                    } else if (valor.tipo === 'P') {
                       valP.push(valor.value);
                       totP = valP.reduce((a, v) => a + v);
                                    } else if (valor.tipo === 'A') {
                       valA.push(valor.value);
                       totA = valA.reduce((a, v) => a + v);
                                      } else if (valor.tipo === 'H') {
                       valH.push(valor.value);
                       totH = valH.reduce((a, v) => a + v);
                                      } else if (valor.tipo === 'N') {
                       valN.push(valor.value);
                       totN = valN.reduce((a, v) => a + v);
                                      } else if (valor.tipo === 'D') {
                        valD.push(valor.value);
                       totD = valD.reduce((a, v) => a + v);
                                       } else if (valor.tipo === 'B') {
                       valB.push(valor.value);
                       totB = valB.reduce((a, v) => a + v);
                                    } else if (valor.tipo === 'T') {
                       valT.push(valor.value);
                       totT = valT.reduce((a, v) => a + v);
                                      } else if (valor.tipo === 'SS') {
                       valSS.push(valor.value);
                       totSS = valSS.reduce((a, v) => a + v);
                                      } else if (valor.tipo === 'CC') {
                       valCC.push(valor.value);
                       totCC = valCC.reduce((a, v) => a + v);
                                      } else if (valor.tipo === 'PP') {
                        valPP.push(valor.value);
                       totPP = valPP.reduce((a, v) => a + v);
                                      }
            })}</div>;
                 valoresMillon.push({val: Number((totX / valX.length).toFixed(2)) , tipo: 'X', pos: 1});
                 valoresMillon.push({val: Number((totY / valY.length).toFixed(2)) , tipo: 'Y', pos: 2});
                 valoresMillon.push({val: Number((totZ / valZ.length).toFixed(2)) , tipo: 'Z', pos: 3});
                 valoresMillon.push({val: Number((tot1 / val1.length).toFixed(2)) , tipo: '1', pos: 4});
                 valoresMillon.push({val: Number((tot2 / val2.length).toFixed(2)) , tipo: '2', pos: 5});
                 valoresMillon.push({val: Number((tot3 / val3.length).toFixed(2)) , tipo: '3', pos: 6});
                 valoresMillon.push({val: Number((tot4 / val4.length).toFixed(2)) , tipo: '4', pos: 7});
                 valoresMillon.push({val: Number((tot5 / val5.length).toFixed(2)) , tipo: '5', pos: 8});
                 valoresMillon.push({val: Number((tot6A / val6A.length).toFixed(2)) , tipo: '6A', pos: 9});
                 valoresMillon.push({val: Number((tot6B / val6B.length).toFixed(2)) , tipo: '6B', pos: 10});
                 valoresMillon.push({val: Number((tot7 / val7.length).toFixed(2)) , tipo: '7', pos: 11});
                 valoresMillon.push({val: Number((tot8A / val8A.length).toFixed(2)) , tipo: '8A', pos: 12});
                 valoresMillon.push({val: Number((tot8B / val8B.length).toFixed(2)) , tipo: '8B', pos: 13});
                 valoresMillon.push({val: Number((totS / valS.length).toFixed(2)) , tipo: 'S', pos: 14});
                 valoresMillon.push({val: Number((totC / valC.length).toFixed(2)) , tipo: 'C', pos: 15});
                 valoresMillon.push({val: Number((totP / valP.length).toFixed(2)) , tipo: 'P', pos: 16});
                 valoresMillon.push({val: Number((totA / valA.length).toFixed(2)) , tipo: 'A', pos: 17});
                 valoresMillon.push({val: Number((totH / valH.length).toFixed(2)) , tipo: 'H', pos: 18});
                 valoresMillon.push({val: Number((totN / valN.length).toFixed(2)) , tipo: 'N', pos: 19});
                 valoresMillon.push({val: Number((totD / valD.length).toFixed(2)) , tipo: 'D', pos: 20});
                 valoresMillon.push({val: Number((totB / valB.length).toFixed(2)) , tipo: 'B', pos: 21});
                 valoresMillon.push({val: Number((totT / valT.length).toFixed(2)) , tipo: 'T', pos: 22});
                 valoresMillon.push({val: Number((totSS / valSS.length).toFixed(2)) , tipo: 'SS', pos: 23});
                 valoresMillon.push({val: Number((totCC / valCC.length).toFixed(2)) , tipo: 'CC', pos: 24});
                 valoresMillon.push({val: Number((totPP / valPP.length).toFixed(2)), tipo: 'PP', pos: 25});
                // console.log(valoresMillon.slice(Math.max(valoresMillon.length - 25)));
                 valoresMillon = valoresMillon.slice(Math.max(valoresMillon.length - 25));
                  console.log(valoresMillon);

                  } else {
           <div>{resultado.valores.map((valor, index) => {
               if (valor.tipo === 'CM') {
                   valA1.push(valor.value);
                   totalA1 = valA1.reduce((a, v) => a + v);
                   console.log(totalA1 / valA1.length);
              } else if (valor.tipo === 'IA') {
                   valIA.push(valor.value);
                   totalIA = valIA.reduce((a, v) => a + v);
                   console.log(totalIA / valIA.length);
              } else if (valor.tipo === 'AS') {
                   valA2.push(valor.value);
                   totalA2 = valA2.reduce((a, v) => a + v);
                   console.log(totalA2 / valA2.length);
              } else if (valor.tipo === 'AC') {
                   valA3.push(valor.value);
                   totalA3 = valA3.reduce((a, v) => a + v);
                   console.log(totalA3 / valA3.length);
              } else if (valor.tipo === 'AR') {
                   valA4.push(valor.value);
                   totalA4 = valA4.reduce((a, v) => a + v);
                   console.log(totalA4 / valA4.length);
              } else if (valor.tipo === 'IN') {
                   valA5.push(valor.value);
                   totalA5 = valA5.reduce((a, v) => a + v);
                   console.log(totalA5 / valA5.length);
              } else if (valor.tipo === 'IE') {
                   valIE.push(valor.value);
                   totalIE = valIE.reduce((a, v) => a + v);
                   console.log(totalIE / valIE.length);
              } else if (valor.tipo === 'EM') {
                   valB3.push(valor.value);
                   totalB3 = valB3.reduce((a, v) => a + v);
                   console.log(totalB3 / valB3.length);
              } else if (valor.tipo === 'RI') {
                   valB1.push(valor.value);
                   totalB1 = valB1.reduce((a, v) => a + v);
                   console.log(totalB1 / valB1.length);
              } else if (valor.tipo === 'RS') {
                   valB2.push(valor.value);
                   totalB2 = valB2.reduce((a, v) => a + v);
                   console.log(totalB2 / valB2.length);
              } else if (valor.tipo === 'AD') {
                   valAD.push(valor.value);
                   totalAD = valAD.reduce((a, v) => a + v);
                   console.log(totalAD / valAD.length);
              } else if (valor.tipo === 'SP') {
                   valC1.push(valor.value);
                   totalC1 = valC1.reduce((a, v) => a + v);
                   console.log(totalC1 / valC1.length);
              } else if (valor.tipo === 'PR') {
                   valC2.push(valor.value);
                   totalC2 = valC2.reduce((a, v) => a + v);
                   console.log(totalC2 / valC2.length);
              } else if (valor.tipo === 'FL') {
                   valC3.push(valor.value);
                   totalC3 = valC3.reduce((a, v) => a + v);
                   console.log(totalC3 / valC3.length);
              } else if (valor.tipo === 'MT') {
                   valMT.push(valor.value);
                   totalMT = valMT.reduce((a, v) => a + v);
                   console.log(totalMT / valMT.length);
              } else if (valor.tipo === 'ME') {
                   valD1.push(valor.value);
                   totalD1 = valD1.reduce((a, v) => a + v);
                   console.log(totalD1 / valD1.length);
              } else if (valor.tipo === 'CI') {
                   valD2.push(valor.value);
                   totalD2 = valD2.reduce((a, v) => a + v);
                   console.log(totalD2 / valD2.length);
              } else if (valor.tipo === 'EA') {
                   valEA.push(valor.value);
                   totalEA = valEA.reduce((a, v) => a + v);
                   console.log(totalEA / valEA.length);
              } else if (valor.tipo === 'FE') {
                   valE1.push(valor.value);
                   totalE1 = valE1.reduce((a, v) => a + v);
                   console.log(totalE1 / valE1.length);
              } else if (valor.tipo === 'OP') {
                   valE2.push(valor.value);
                   totalE2 = valE2.reduce((a, v) => a + v);
                   console.log(totalE2 / valE2.length);
              } else if (valor.tipo === 'G') {
                   valG.push(valor.value);
                   totalG = valG.reduce((a, v) => a + v);
                   console.log(totalG / valG.length);
              }
        })}</div>;
             valoresIceB.push({val: Number((totalIA / valIA.length).toFixed(2)) , tipo: 'IA', pos: 1});
             valoresIceB.push({val: Number((totalA1 / valA1.length).toFixed(2)) , tipo: 'CM', pos: 2});
             valoresIceB.push({val: Number((totalA2 / valA2.length).toFixed(2)) , tipo: 'AS', pos: 3});
             valoresIceB.push({val: Number((totalA3 / valA3.length).toFixed(2)) , tipo: 'AC', pos: 4});
             valoresIceB.push({val: Number((totalA4 / valA4.length).toFixed(2)) , tipo: 'AR', pos: 5});
             valoresIceB.push({val: Number((totalA5 / valA5.length).toFixed(2)) , tipo: 'IN', pos: 6});
             valoresIceB.push({val: Number((totalIE / valIE.length).toFixed(2)) , tipo: 'IE', pos: 7});
             valoresIceB.push({val: Number((totalB3 / valB3.length).toFixed(2)) , tipo: 'EM', pos: 8});
             valoresIceB.push({val: Number((totalB1 / valB1.length).toFixed(2)) , tipo: 'RI', pos: 9});
             valoresIceB.push({val: Number((totalB2 / valB2.length).toFixed(2)) , tipo: 'RS', pos: 10});
             valoresIceB.push({val: Number((totalAD / valAD.length).toFixed(2)) , tipo: 'AD', pos: 11});
             valoresIceB.push({val: Number((totalC1 / valC1.length).toFixed(2)) , tipo: 'SP', pos: 12});
             valoresIceB.push({val: Number((totalC2 / valC2.length).toFixed(2)) , tipo: 'PR', pos: 13});
             valoresIceB.push({val: Number((totalC3 / valC3.length).toFixed(2)) , tipo: 'FL', pos: 14});
             valoresIceB.push({val: Number((totalMT / valMT.length).toFixed(2)) , tipo: 'MT', pos: 15});
             valoresIceB.push({val: Number((totalD1 / valD1.length).toFixed(2)) , tipo: 'ME', pos: 16});
             valoresIceB.push({val: Number((totalD2 / valD2.length).toFixed(2)) , tipo: 'CI', pos: 17});
             valoresIceB.push({val: Number((totalEA / valEA.length).toFixed(2)) , tipo: 'EA', pos: 18});
             valoresIceB.push({val: Number((totalE1 / valE1.length).toFixed(2)) , tipo: 'FE', pos: 19});
             valoresIceB.push({val: Number((totalE2 / valE2.length).toFixed(2)) , tipo: 'OP', pos: 20});
             valoresIceB.push({val: Number((totalG / valG.length).toFixed(2)) , tipo: 'G', pos: 21});
            // console.log(valoresIceB.slice(Math.max(valoresIceB.length - 25)));
             valoresIceB = valoresIceB.slice(Math.max(valoresIceB.length - 21));
              console.log(valoresIceB);
          }
          })}
      </div>
  </div>
)}
      <div className='card blue-grey darken-1'>
          <div className='card-content white-text'>
          <span className='card-title'>Test del Estres</span>
          </div>
          <div className='card-content white'>
          <Tabs className='z-depth-1 tabs-fixed-width'>
          <Tab title='Barras' active>
          <br/>
          <ResponsiveContainer width='100%' height={300}>
           <BarChart data={valoresFin.sort((a, b) => Number(a.val) - Number(b.val))} margin={{top: 20, right: 10, bottom: 20}}>
          <Bar dataKey='val'>
          {
          valoresFin.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
          </Bar>
          <XAxis dataKey='tipo'/>
          <YAxis/>
          <Tooltip content={<CustomTooltip/>}/>
          </BarChart>
          </ResponsiveContainer>
        </Tab>
        <Tab title='Araña' active><br/>
          <ResponsiveContainer width='100%' height={300}>
         <RadarChart outerRadius={120} data={valoresFin}>
            <Radar dataKey='val' stroke='#FF8042' fill='#FF8042' fillOpacity={0.6}/>
            <PolarAngleAxis dataKey='tipo' />
            <PolarGrid />
            <PolarRadiusAxis />
          </RadarChart>
           </ResponsiveContainer>
           </Tab>
           </Tabs>
           {tipos.map(un => <span style={{fontStyle: 'italic'}}> <b>{un.ab}</b> = {un.tipo}. </span>)}
        </div>
      </div>
        <div className='card blue-grey darken-1'>
          <div className='card-content white-text'>
          <span className='card-title'>Test de Millon</span>
          </div>
          <div className='card-content white'>
          <Tabs className='z-depth-1 tabs-fixed-width'>
          <Tab title='Area' active>
          <br/>
          <ResponsiveContainer width='100%' height={300}>
           <AreaChart width={600} height={400} data={valoresMillon.sort((a, b) => Number(a.pos) - Number(b.pos))}
            margin={{top: 10, right: 10, left: 0, bottom: 0}}>
            <XAxis dataKey='tipo'/>
            <YAxis/>
            <CartesianGrid strokeDasharray='3 3'/>
            <Tooltip/>
            <Area type='monotone' dataKey='val' stroke='#3E84D9' fill='#3E84D9' />
          </AreaChart>
          </ResponsiveContainer>
        </Tab>
        <Tab title='Lineal' active><br/>
          <ResponsiveContainer width='100%' height={300}>
            <ScatterChart width={600} height={400} margin={{top: 10, right: 10, bottom: 0, left: 0}}>
            <XAxis dataKey={'tipo'} name='tipo'/>
            <YAxis dataKey={'val'} name='val'/>
            <ZAxis range={[100]}/>
            <CartesianGrid />
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            <Scatter name='tipo' data={valoresMillon} fill='#8884d8' line shape='circle'/>
            </ScatterChart>
           </ResponsiveContainer>
           </Tab>
           </Tabs>
           {tipos2.map(un => <span style={{fontStyle: 'italic'}}> <b>{un.ab}</b> = {un.tipo}. </span>)}
        </div>
      </div>
       <div className='card blue-grey darken-1'>
    <div className='card-content white-text'>
      <span className='card-title'>Test ICE Baron</span>
    </div>
    <div className='card-content white'>
     <Tabs className='z-depth-1 tabs-fixed-width'>
        <Tab title='Barras' active>
          <br/>
           <ResponsiveContainer width='100%' height={300}>
            <BarChart data={valoresIceB.sort((a, b) => Number(a.pos) - Number(b.pos))} margin={{top: 5, right: 10, left: 0, bottom: 5}}>
              <XAxis dataKey='tipo'/>
              <YAxis/>
              <Tooltip content={<CustomTooltip3/>}/>
              <ReferenceLine y={0} stroke='#000'/>
              <ReferenceLine y={89} label={{ position: 'top',  value: 'Poco desarrollada'}} stroke='red' strokeDasharray='3 3'/>
              <ReferenceLine y={109} label={{ position: 'top',  value: 'Adecuada'}} stroke='red' strokeDasharray='3 3'/>
              <Bar dataKey='val'>
                {
                  valoresIceB.map((entry, index) => <Cell fill={COLORS2[index % COLORS2.length]}/>)
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Tab>
        <Tab title='Area' active>
          <br/>
          <ResponsiveContainer width='100%' height={300}>
            <AreaChart width={600} height={400} data={valoresIceB.sort((a, b) => Number(a.pos) - Number(b.pos))}
              margin={{top: 10, right: 10, left: 0, bottom: 0}}>
              <XAxis dataKey='tipo'/>
              <YAxis/>
              <CartesianGrid strokeDasharray='3 3'/>
              <ReferenceLine y={89} label={{ position: 'top',  value: 'Poco desarrollada'}} stroke='red' strokeDasharray='3 3'/>
              <ReferenceLine y={109} label={{ position: 'top',  value: 'Adecuada'}} stroke='red' strokeDasharray='3 3'/>
              <Tooltip content={<CustomTooltip3/>}/>
              <Area type='monotone' dataKey='val' stroke='#148F77' fill='#D1F2EB' />
            </AreaChart>
         </ResponsiveContainer>
        </Tab>
      </Tabs>
      {tipos3.map(un => <span style={{fontStyle: 'italic'}}> <b>{un.ab}</b> = {un.tipo}. </span>)}
    </div>
  </div>
  </section>
);
