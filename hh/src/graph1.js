import { ResponsiveBar } from "@nivo/bar";

const Graph1 = ({ graphdata, graphType }) => {
  const dataKeys = Object.keys(graphdata).filter(key => key !== "results");

  let processedData = dataKeys.map(key => {
    const value = graphdata[key];
    return {
      id: key,
      value: typeof value === 'object' ? Object.values(value).reduce((acc, cur) => acc + cur, 0) : value
    };
  });

  // 개수가 큰 순서대로 상위 4개 데이터 정렬
  processedData.sort((a, b) => b.value - a.value);

  let finalData = processedData.slice(0, 4);
  let legendKeys = finalData.map(item => item.id); // 범례 키 초기화

  // 나머지 데이터를 '기타'로 묶음
  if (processedData.length > 4) {
    const othersSum = processedData.slice(4).reduce((sum, current) => sum + current.value, 0);
    if (othersSum > 0) {
      finalData.push({ id: '기타', value: othersSum });
      legendKeys.push('기타'); // 범례에 '기타' 추가
    }
  }

  // 막대그래프의 순서를 반대로 변경
  finalData.reverse();

  const totalValue = 100;
  const numofTick = 5;
  const tickvalues = (totalValue, numTicks) => {
    const tickValues = [];
    const tickInterval = Math.floor(totalValue / (numTicks - 1));
    for (let i = 0; i < numTicks; i++) {
      tickValues.push(i * tickInterval);
    }
    return tickValues;
  };

  return (
    <ResponsiveBar
      data={finalData.map(item => ({ ...item, [item.id]: item.value }))}
      keys={legendKeys} // 범례 키 사용
      indexBy="id"
      margin={{ right: 90, bottom: 50, left: 80 }}
      padding={0.3}
      layout="horizontal"
      colors={{ scheme: "nivo" }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
        tickValues: tickvalues(totalValue, numofTick),
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -70,
      }}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
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