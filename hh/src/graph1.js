import { ResponsiveBar } from "@nivo/bar";

const Graph1 = ({ graphdata }) => {
  console.log(graphdata);
  // 데이터의 키 배열 추출 (results를 제외하고 추출)
  const dataKeys = Object.keys(graphdata).filter((key) => key !== "results");
  // 데이터를 배열로 변환
  const dataArray = dataKeys.map((key) => {
    const value = graphdata[key];
    return {
      id: key,
      value:
        typeof value === "object"
          ? Object.values(value).reduce((acc, cur) => acc + cur, 0)
          : value,
    };
  });

  let finalData = dataArray.slice(0, 4);

  let legendKeys = finalData.map((item) => item.id); // 범례 키 초기화

  // 나머지 데이터를 '기타'로 묶음
  if (dataArray.length > 4) {
    const othersSum = dataArray
      .slice(4)
      .reduce((sum, current) => sum + current.value, 0);
    if (othersSum > 0) {
      finalData.push({ id: "기타", value: othersSum });
      legendKeys.push("기타"); // 범례에 '기타'추가
    }
  }
  // 기타 포함 내림차순으로 정렬
  // finalData = finalData.sort((a, b) => a.value - b.value);
  finalData.reverse();
  // 상위 5개만 출력
  const fivekeys = Object.values(dataArray).map((item) => item.id);

  // 가장 큰 값 찾기
  console.log(
    "기존",
    Object.keys(graphdata).reduce((a, b) =>
      graphdata[a] > graphdata[b] ? a : b
    )
  );
  console.log(
    "새로운 거",
    finalData.map((item) => item.value).reduce((a, b) => (a > b ? a : b))
  );
  console.log(
    "새로운 거2",
    finalData.map((item) => item.value).reduce((a, b) => (a > b ? a : b))
  );

  // finalData(기타 포함 5개) 중 가장 큰 값
  const Roundup = (num) => Math.ceil(num / 100) * 100;
  let maxValue = finalData
    .map((item) => item.value)
    .reduce((a, b) => (a > b ? a : b));
  // 가장 큰 값 기준으로 올림
  let totalValue = Roundup(maxValue);

  // totalValue 변수에 가장 큰 값 저장
  console.log("5. 가장 큰 값:", totalValue);
  // 그래프 눈금 조절
  const tickvalues = (totalValue, numTicks) => {
    const tickValues = [];
    const tickInterval = Math.floor(totalValue / (numTicks - 1));
    console.log(tickInterval);

    for (let i = 0; i < numTicks; i++) {
      tickValues.push(i * tickInterval);
    }
    return tickValues;
  };
  const numofTick = 5;
  console.log(tickvalues(totalValue, numofTick));
  // // 눈금 수 설정

  return (
    <ResponsiveBar
      data={finalData.map((item) => ({ ...item, [item.id]: item.value }))}
      keys={legendKeys}
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
