// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Graph2 = ({ graphdata }) => {
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
        value: totalValue || 0,
      };
    })
    .slice(0, 5);

  const fivekeys = Object.values(dataArray).map((item) => item.id);

  return (
    <ResponsivePie
      data={dataArray}
      keys={dataKeys}
      margin={{ top: 50, right: 60, bottom: 50, left: 80 }}
      innerRadius={0.6}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "pastel1" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLinkLabelsDiagonalLength={10}
      arcLinkLabelsStraightLength={10}
      arcLinkLabelsTextOffset={4}
      arcLabel={(e) =>
        `${(
          (e.value / dataArray.reduce((acc, cur) => acc + cur.value, 0)) *
          100
        ).toFixed(1)}%`
      }
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "left",
          direction: "column",
          justify: false,
          translateX: -70,
          translateY: 0,
          itemsSpacing: 20,
          itemWidth: 50,
          itemHeight: 5,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 15,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Graph2;
