'use client'
import {useState, useEffect} from "react";
import langChart from "./components/chart";

interface usefulldata {
  name: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  languages_url: string;
}

interface languages {
  names: string[];
  numbers: number[];
}

export default function Home() {

  const [initialData, setInitialData] = useState<usefulldata>();
  const [lang, setLang] = useState<languages>();
  const [enable, setEnable] = useState<boolean>(false)
  const [pesquisa, setPesquisa] = useState<string>('');
  useEffect(() => {
    fetch("https://api.github.com/search/repositories?q=stars:>1&per_page=1")
      .then(response => {if (response.ok) { return response.json() } throw response})
      .then(data => {setInitialData(data?.items[0]);  setEnable(true)})
      .catch( error => { console.log(error) });      

  }, []);

  useEffect(() => {
    if (initialData!= undefined){
      fetch(initialData?.languages_url)
        .then(response => {if (response.ok) {return response.json()} throw response})
        .then(data => setLang({names: Object.keys(data), numbers: Object.values(data)}))
    }
    else{
      setLang(undefined)
    }
    console.log(lang)
  }, [enable])

function handle(e:any){
    e.preventDefault();
    const parametros = pesquisa.replace(/ +/g, '+')
    console.log(parametros)
    fetch("https://api.github.com/search/repositories?q=" + parametros +"&stars:>1&per_page=1")
      .then(response => {if (response.ok) { return response.json() } throw response})
      .then(data => {setInitialData(data?.items[0]);  setEnable(!enable)})
      .catch( error => { console.log(error) });   
  
  }

  return (
    <div className="flex flex-col container mx-auto space-y-4 py-3 w-2/3">
      <div className="flex flex-col mx-auto px-4 py-2 ">
        <h1 className="text-6xl w-fit mx-auto">GITHUD</h1>
        <div className="text-center w-fit mx-auto">This is a simple GitHub repository analyzer, showing the name, star and watchers count as well as a pie chart with all the programming languages used in the most popular repository related to the keywords written on the input space below.</div>
      </div>
      <form onSubmit={handle} >
      <div className="mx-auto px-4 w-fit space-x-2" >
        <input className="text-black px-4 py-1 rounded-md" value={pesquisa} placeholder="Key words here" onChange={(e) => setPesquisa(e.target.value)}/>
        <button className="bg-gray-500 px-2 py-2 rounded-md" type="submit">Search Repo</button>
      </div>
      </form>
      <div className="flex mx-auto space-x-10 ">
      <div className="bg-slate-800 container w-fit px-4 py-1 rounded-md">
        Name: 
        {initialData? initialData.name: "No Data"}
      </div>
      <div className="container w-fit px-4 py-1 bg-slate-800 rounded-md">
        Stars: 
        {initialData? initialData.stargazers_count : "No Data"}
      </div>
      </div>
      <div className="flex mx-auto space-x-10">
      <div className="bg-slate-800 container w-fit px-4 py-1 rounded-md">
        Forks: 
        {initialData? initialData.forks_count : "No Data"}
      </div>
      <div className="bg-slate-800 container w-fit px-4 py-1 rounded-md">
        Watchers: 
        {initialData? initialData.watchers_count : "No Data"}
      </div>
      </div>
      <div className="bg-slate-800 w-fit px-4 py-1 mx-auto rounded-md">
        Languages Used: 
        <div className="size-96"> {lang? langChart('Pie',lang.names, lang.numbers):"No Data"} </div>
      </div>
      
    </div>
  );
}
