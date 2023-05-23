import axios from "axios";

const url="https://api.apify.com/v2/key-value-stores/moxA3Q0aZh5LosewB/records/LATEST";

export const fetchData = async (country) => {
  let changeableUrl = url;


  try {
    const { data } = await axios.get(changeableUrl,{params:{disableRedirect:true}});
    console.log(data);
    const modifiedData = {
      confirmed:data.totalCases,
      recovered:data.totalCases-data.totalDeaths,
      deaths:data.totalDeaths,
      lastUpdate:data.lastUpdatedAtSource,
    };
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData=async()=>{
    try{
        const {data:{casesByState}} =await axios.get(url)
        const modifiedData=casesByState.map((dailyData)=>({
          confirmed:dailyData.casesReported,
          deaths: parseInt(dailyData.range.match(/\d+/)[0].replace(/,/g, ""), 10),
          date:new Date(+new Date('2022-01-01') + Math.random() * (+new Date('2020-12-31') - +new Date('2023-01-01'))).toDateString(),
        }))
        return modifiedData;
    }
    catch (error){
      console.log(error);
    }
}

export const fetchCountries= async()=>{
  try{
    const {data:{casesByState}}=await axios.get(url);
    const modifiedData=casesByState.map((countries)=>({
      country:countries.name
    }))
    return modifiedData;
  }
  catch(error){
    console.log(error);
  }
}