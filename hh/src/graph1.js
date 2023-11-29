// install (please try to align the version of installed @nivo packages)food
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Graph1 = ({ graphdata }) => {
  // 데이터의 키 배열 추출 (results를 제외하고 추출)
  const dataKeys = Object.keys(graphdata).filter((key) => key !== "results");

  // 데이터를 배열로 변환
  const dataArray = dataKeys
    .map((key) => {
      const value = graphdata[key];

      const totalValue =
        typeof value === "object"
          ? Object.values(value).reduce((acc, cur) => acc + cur, 0)
          : value;
      return {
        id: key,
        [key]: totalValue || 0,
      };
    })
    .slice(0, 5);

  // 그래프 눈금 조절
  const tickvalues = (totalValue, numTicks) => {
    const tickValues = [];
    const tickInterval = Math.floor(totalValue / (numTicks - 1));

    for (let i = 0; i < numTicks; i++) {
      tickValues.push(i * tickInterval);
    }
    return tickValues;
  };
  // 전체 건수 예시
  const totalValue = 100;

  // // 눈금 수 설정
  const numofTick = 5;
  return (
    <ResponsiveBar
      data={dataArray}
      keys={dataKeys}
      margin={{ top: 20, right: 90, bottom: 40, left: 80 }}
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
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) => `${e.formattedValue}`}
    />
  );
};

export default Graph1;
