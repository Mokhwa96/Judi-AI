// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Graph2 = ({ graphdata, graphType }) => {
    // 데이터의 키 배열 추출
    const dataKeys = Object.keys(graphdata).filter(key => key !== 'results');

    // 각 키에 대한 값 계산
    const processedData = dataKeys.map(key => {
        const value = graphdata[key];
        const totalValue = typeof value === 'object' ? Object.values(value).reduce((acc, cur) => acc + cur, 0) : value;
        return { id: key, value: totalValue };
    });

    // 값에 따라 내림차순 정렬
    processedData.sort((a, b) => b.value - a.value);

    // 상위 4개 데이터 추출
    const topData = processedData.slice(0, 4);

    // '기타' 항목 계산
    let othersSum = 0;
    if (processedData.length > 4) {
        othersSum = processedData.slice(4).reduce((sum, current) => sum + current.value, 0);
    }

    // 최종 데이터 구성
    let finalData = topData;
    if (othersSum > 0) {
        finalData.push({ id: '기타', value: othersSum }); // '기타' 항목 추가
    }

    // 파이 차트 데이터 변환
    const dataArray = finalData.map(item => ({
        id: item.id,
        value: item.value
    }));

    return(
        <ResponsivePie
            data={dataArray}
            keys={dataKeys}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'paired' }}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabel={(e) => `${((e.value / dataArray.reduce((acc, cur) => acc + cur.value, 0)) * 100).toFixed(1)}%`}


            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'left',
                    direction: 'column',
                    justify: false,
                    translateX: -80,
                    translateY: 40,
                    itemsSpacing: 20,
                    itemWidth: 50,
                    itemHeight: 5,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 15,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    );
};

export default Graph2;