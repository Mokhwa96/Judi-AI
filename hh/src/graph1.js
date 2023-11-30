// install (please try to align the version of installed @nivo packages)food
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Graph1 = ({ graphdata }) => {
  console.log(graphdata);
  // 데이터의 키 배열 추출 (results를 제외하고 추출)
  const dataKeys = Object.keys(graphdata).filter((key) => key !== "results");
  console.log("1. datakey", dataKeys);
  // 데이터를 배열로 변환
  const dataArray = dataKeys
    .map((key) => {
      const value = graphdata[key];
      console.log("2. value", value);
      const totalValue =
        typeof value === "object"
          ? Object.values(value).reduce((acc, cur) => acc + cur, 0)
          : value;
      console.log("3. totalValue", totalValue);
      return {
        id: key,
        [key]: totalValue || 0,
      };
    })
    .slice(0, 5);
  console.log("중간");
  // 상위 5개만 출력
  const fivekeys = Object.values(dataArray).map((item) => item.id);

  // 그래프 눈금 조절
  const tickvalues = (totalValue, numTicks) => {
    const tickValues = [];
    const tickInterval = Math.floor(totalValue / (numTicks - 1));

    for (let i = 0; i < numTicks; i++) {
      tickValues.push(i * tickInterval);
    }
    return tickValues;
  };

  // 가장 큰 값 찾기
  // const totalValue = Math.max(
  //   ...dataArray.map((graphdata) => graphdata[dataKeys[0]])
  // );
  // let maxKey = Object.keys(myObject).reduce((a, b) => myObject[a] > myObject[b] ? a : b);
  let maxValue = Object.keys(graphdata).reduce((a, b) =>
    graphdata[a] > graphdata[b] ? a : b
  );

  let totalValue = 0;
  const Roundup = (num) => Math.ceil(num / 100) * 100;
  let a = graphdata[maxValue];
  totalValue = Roundup(a);
  let keys = Object.keys(graphdata);

  if (typeof graphdata[keys[0]] === "object") {
    maxValue = 0;
    for (let i = 0; i < keys.length; i++) {
      let keys2 = Object.keys(graphdata[keys[i]]);
      if (Object.keys(keys2).length === 0) continue;
      let sum = 0;
      for (let j = 0; j < keys2.length; j++) {
        sum += graphdata[keys[i]][keys2[j]];
      }

      maxValue = maxValue > sum ? maxValue : sum;
    }
    console.log("4. 최대값", maxValue);

    totalValue = Roundup(maxValue);
    // totalValue = maxValue;
  }

  // console.log("메롱", totalValue);

  // totalValue 변수에 가장 큰 값 저장
  console.log("5. 가장 큰 값:", totalValue);
  // // 눈금 수 설정
  const numofTick = 5;
  return (
    <ResponsiveBar
      data={dataArray}
      keys={fivekeys}
      margin={{ top: 10, right: 50, bottom: 40, left: 130 }}
      padding={0.3}
      layout="horizontal"
      colors={{ scheme: "purple_blue" }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,

        /*legend: xAxisLabel,*/
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
        tickValues: tickvalues(totalValue, numofTick), // 원하는 눈금의 수로 조절
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 0,
        style: {
          whiteSpace: "pre-line", // 텍스트 줄바꿈 활성화
        },
        legend: "",
        legendPosition: "middle",
        legendOffset: -70,
        truncateTickAt: 0,
      }}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      borderRadius={10}
      // legends={[
      //   {
      //     dataFrom: "keys",
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 110,
      //     translateY: -15,
      //     itemsSpacing: 2,
      //     itemWidth: 100,
      //     itemHeight: 20,
      //     itemDirection: "left-to-right",
      //     itemOpacity: 0.85,
      //     symbolSize: 10,
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}

      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) => `${e.formattedValue}`}
    />
  );
};

export default Graph1;
