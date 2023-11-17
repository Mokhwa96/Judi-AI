import matplotlib.pyplot as plt
import re
import matplotlib.font_manager as fm
import numpy as np

#판결 결과 출력물 예시

sentences = ["피고인을 징역 1년 2월에 처한다. 다만, 이 판결 확정일로부터 3년간 위 형의 집행을 유예한다. 피고인에 대하여 240시간의 사회봉사를 명한다.",
             "피고인을 벌금 3,000,000원에 처한다. 피고인이 위 벌금을 납입하지 아니하는 경우 100,000원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 위 벌금에 상당한 금액의 가납을 명한다.",
             '피고인을 벌금 1,000,000원에 처한다. 피고인이 위 벌금을 납입하지 아니하는 경우 100,000원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 위 벌금에 상당한 금액의 가납을 명한다. 소송비용 중 증인 여비는 피고인이 부담한다.',
             "피고인을 벌금 300,000원에 처한다. 피고인이 위 벌금을 납입하지 아니하는 경우 100,000원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 피고인에게 위 벌금에 상당한 금액의 가납을 명한다.",
             "피고인을 징역 6월에 처한다. 다만, 이 판결 확정일로부터 2년간 위 형의 집행을 유예한다. 피고인에게 80시간의 사회봉사를 명한다.",
             "피고인을 벌금 3,000,000원에 처한다. 피고인이 위 벌금을 납입하지 아니하는 경우 10만 원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 위 벌금에 상당한 금액의 가납을 명한다.",
             "피고인을 벌금 50만 원에 처한다. 다만, 이 판결 확정일로부터 1년간 위 형의 집행을 유예한다. 위 집행유예 선고가 실효 또는 취소되고 피고인이 위 벌금을 납입하지 아니하는 경우 10만 원을 1일로 환산한 기간 피고인을 노역장에 유치한다.",
             '피고인을 벌금 200만 원에 처한다. 피고인이 위 벌금을 납입하지 아니하는 경우 10만 원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 위 벌금 상당액의 가납을 명한다.',
             "피고인을 벌금 500,000원에 처한다. 다만, 이 판결 확정일로부터 1년간 위 형의 집행을 유예한다. 위 집행유예 선고가 실효 또는 취소되고 피고인이 위 벌금을 납입하지 아니하는 경우 100,000원을 1일로 환산한 기간 피고인을 노역장에 유치한다.",
             '피고인을 벌금 700만 원에 처한다. 피고인이 위 벌금을 납입하지 아니하는 경우 10만 원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 피고인에게 40시간의 성폭력치료 프로그램의 이수를 명한다. 피고인에게 아동·청소년 관련기관 등과 장애인복지시설에 3년간 취업제한을 명한다. 위 벌금에 상당한 금액의 가납을 명한다.',
             "피고인을 벌금 4,000,000원에 처한다. 피고인이 위 벌금을 납입하지 않는 경우 100,000원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 피고인에게 80시간의 성폭력치료 프로그램 이수를 명한다. 피고인에게 아동·청소년 관련기관 등과 장애인복지시설에 각 3년간 취업제한을 명한다. 위 벌금에 상당한 금액의 가납을 명한다.",
             '피고인을 벌금 200만 원에 처한다. 피고인이 위 벌금을 납입하지 아니할 경우 10만 원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 피고인에 대하여 40시간의 성폭력 치료프로그램 이수를 명한다. 위 벌금에 상당한 금액의 가납을 명한다.',
             "피고인을 벌금 5,000,000원에 처한다. 피고인이 위 벌금을 납입하지 아니하는 경우 100,000원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 피고인에게 위 벌금에 상당한 금액의 가납을 명한다. 피고인에게 40시간의 성폭력 치료프로그램의 이수를 명한다. 피고인에 대한 정보를 2년간 정보통신망을 이용하여 공개한다. 피고인에 대하여 아동·청소년 관련기관 등 및 장애인복지시설에 3년간 취업제한을 명한다.",
             "피고인을 벌금 300만 원에 처한다. 피고인이 위 벌금을 납입하지 아니하는 경우 10만 원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 위 벌금에 상당한 금액의 가납을 명한다.",
             '피고인을 금고 8월에 처한다. 다만, 이 판결 확정일부터 2년간 위 형의 집행을 유예한다. 피고인에 대하여 40시간의 준법운전강의 수강을 명한다.']

def result(sentences):

    # 로컬실행 그래프 한글폰트설정

    font_path = 'C:/Windows/Fonts/malgun.ttf'
    font_name = fm.FontProperties(fname=font_path).get_name()
    plt.rc('font', family=font_name)

    징역 = {}
    금고 = {}
    벌금 = {}
    집행유예 = {}
    사회봉사 = {}
    성폭력_치료프로그램 = {}
    피고인_정보공개 = {}
    아동_청소년_장애인복지시설_취업제한 = {}
    준법운전강의 = {}

    for text in sentences:
        text = re.sub(r'\d\.', '', text)

        if '징역' in text:
            pattern = r'징역 (.*?)에'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1).replace('개','') in 징역:
                    징역[re.search(pattern, text).group(1).replace('개','')] += 1
                else:
                    징역[re.search(pattern, text).group(1).replace('개','')] = 1

        if '금고' in text:
            pattern = r'금고 (.*?)에'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1).replace('개','') in 금고:
                    금고[re.search(pattern, text).group(1).replace('개','')] += 1
                else:
                    금고[re.search(pattern, text).group(1).replace('개','')] = 1

        if '벌금' in text:
            pattern = r'벌금 (.*?)에 처한다'
            if bool(re.search(pattern, text)):
                money = re.search(pattern, text).group(1).replace(',','').replace(' ','').replace('(백만)','')

                if '만원' in money:

                    if money in 벌금:
                        벌금[money] += 1
                    else:
                        벌금[money] = 1
                else:
                    money = str(int(int(money[:-1])/10000))+'만원'
                    if money in 벌금:
                        벌금[money] += 1
                    else:
                        벌금[money] = 1

        if '유예' in text:
            pattern = r'(\d+년).*집행.*유예'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1) in 집행유예:
                    집행유예[re.search(pattern, text).group(1)] += 1
                else:
                    집행유예[re.search(pattern, text).group(1)] = 1
            pattern1 = r'(\d+년).*선고.*유예'
            if bool(re.search(pattern1, text)):
                if re.search(pattern1, text).group(1) in 집행유예:
                    집행유예['선고유예'] += 1
                else:
                    집행유예['선고유예'] = 1

        if '사회봉사' in text:
            pattern = r'(\d+시간)의 사회봉사'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1) in 사회봉사:
                    사회봉사[re.search(pattern, text).group(1)] += 1
                else:
                    사회봉사[re.search(pattern, text).group(1)] = 1

        if '성폭력' in text:
            pattern = r'(\d+시간)의 성폭력'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1) in 성폭력_치료프로그램:
                    성폭력_치료프로그램[re.search(pattern, text).group(1)] += 1
                else:
                    성폭력_치료프로그램[re.search(pattern, text).group(1)] = 1

        if '피고인에 대한 정보' in text:
            pattern = r'\d+년'
            if bool(re.findall(pattern, text)):
                if re.findall(pattern, text)[0] in 피고인_정보공개:
                    피고인_정보공개[re.findall(pattern, text)[0]] += 1
                else:
                    피고인_정보공개[re.findall(pattern, text)[0]] = 1

        if '청소년 관련기관' in text:
            pattern = r'(\d+년).*취업제한'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1) in 아동_청소년_장애인복지시설_취업제한:
                    아동_청소년_장애인복지시설_취업제한[re.search(pattern, text).group(1)] += 1
                else:
                    아동_청소년_장애인복지시설_취업제한[re.search(pattern, text).group(1)] = 1

        if '준법운전강의' in text:
            pattern = r'(\d+시간)의 준법운전강의'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1) in 준법운전강의:
                    준법운전강의[re.search(pattern, text).group(1)] += 1
                else:
                    준법운전강의[re.search(pattern, text).group(1)] = 1

    징역 = dict(sorted(징역.items(), key=lambda x:x[1], reverse=True))
    금고 = dict(sorted(금고.items(), key=lambda x:x[1], reverse=True))
    벌금 = dict(sorted(벌금.items(), key=lambda x:x[1], reverse=True))
    집행유예 = dict(sorted(집행유예.items(), key=lambda x:x[1], reverse=True))
    사회봉사 = dict(sorted(사회봉사.items(), key=lambda x:x[1], reverse=True))
    성폭력_치료프로그램 = dict(sorted(성폭력_치료프로그램.items(), key=lambda x:x[1], reverse=True))
    피고인_정보공개 = dict(sorted(피고인_정보공개.items(), key=lambda x:x[1], reverse=True))
    아동_청소년_장애인복지시설_취업제한 = dict(sorted(아동_청소년_장애인복지시설_취업제한.items(), key=lambda x:x[1], reverse=True))
    준법운전강의 = dict(sorted(준법운전강의.items(), key=lambda x:x[1], reverse=True))
    pltcount = sum(bool(x) for x in [징역, 금고, 벌금, 집행유예, 사회봉사, 성폭력_치료프로그램, 피고인_정보공개, 아동_청소년_장애인복지시설_취업제한, 준법운전강의])

    # pie 그래프 그리는 함수 정의
    def create_pie_chart(data_dict, category_name, pltcount, count):
      total = sum(data_dict.values())  # 총합 계산
      labels = []
      sizes = []
      others = 0  # "기타"의 값

      # 항목별 비중을 계산하고, 10% 미만 항목은 "기타"로 묶음
      for label, size in data_dict.items():
          if size / total >= 0.1:  # 비중이 10% 이상인 경우
              labels.append(label)
              sizes.append(size)
          else:  # 비중이 10% 미만인 경우
              others += size

      # "기타" 항목을 리스트에 추가
      if others > 0:
          labels.append('기타')
          sizes.append(others)

      plt.subplot(2, (pltcount+1)//2, count)
      plt.pie(sizes, labels=labels, autopct='%1.1f%%')  # 파이 차트 생성
      plt.xlabel(category_name)
      count += 1
      return count

		#=========pie=========

    # 파이 차트를 위한 셋업
    fig1 = plt.figure(figsize=(10 * pltcount, 10))  # 전체 그림 크기 조절
    count = 1

    # 각 범주별 파이 차트 생성
    if 징역:
        count = create_pie_chart(징역, '징역', pltcount, count)
    if 금고:
        count = create_pie_chart(금고, '금고', pltcount, count)
    if 벌금:
        count = create_pie_chart(벌금, '벌금', pltcount, count)
    if 집행유예:
        count = create_pie_chart(집행유예, '집행유예', pltcount, count)
    if 사회봉사:
        count = create_pie_chart(사회봉사, '사회봉사', pltcount, count)
    if 성폭력_치료프로그램:
        count = create_pie_chart(성폭력_치료프로그램, '성폭력 치료프로그램', pltcount, count)
    if 피고인_정보공개:
        count = create_pie_chart(피고인_정보공개, '피고인 정보공개', pltcount, count)
    if 아동_청소년_장애인복지시설_취업제한:
        count = create_pie_chart(아동_청소년_장애인복지시설_취업제한, '아동 청소년 장애인복지시설 취업제한', pltcount, count)
    if 준법운전강의:
        count = create_pie_chart(준법운전강의, '준법운전강의', pltcount, count)


    # bar 그래프 그리는 함수 정의
    def create_bar_chart(data_dict, category_name, pltcount, count):
        total = sum(data_dict.values())
        labels = []
        sizes = []
        others = 0  # "기타"의 값

        # 항목별 비중을 계산하고, 10% 미만 항목은 "기타"로 묶음
        for label, size in data_dict.items():
            percentage = (size / total) * 100
            if percentage >= 10.0:  # 비중이 10% 이상인 경우
                labels.append(f"{label} ({percentage:.1f}%, {size}건)")
                sizes.append(size)
            else:  # 비중이 10% 미만인 경우
                others += size

        # "기타" 항목을 리스트에 추가
        if others > 0:
            other_percentage = (others / total) * 100
            labels.append(f"기타 ({other_percentage:.1f}%, {others}건)")
            sizes.append(others)

        plt.subplot(3, (pltcount+2)//3, count)
        colors = plt.cm.viridis(np.linspace(0, 1, len(sizes)))  # 막대 개수에 따라 색깔 생성
        plt.bar(labels, sizes, color=colors)  # 바 차트 생성

        # 총 데이터 개수를 x축 라벨에 표시
        xlabel = f'{category_name} - {total}건'
        plt.xlabel(xlabel)

        # 최대값 + 10% 정도 여유를 두어 최상위 눈금 설정
        upper_limit = int(max(sizes)*1.1)

        # 강제로 y축 눈금을 정수로 설정
        plt.gca().yaxis.set_major_locator(plt.MaxNLocator(integer=True))

        # y축 범위 설정
        plt.ylim(0, upper_limit)
        count += 1
        return count


    #===========bar=================

    # 바 차트를 위한 셋업
    fig2 = plt.figure(figsize=(10 * pltcount, 10))  # 전체 그림 크기 조절
    count = 1

    # 각 범주별 바 차트 생성
    if 징역:
        count = create_bar_chart(징역, '징역', pltcount, count)
    if 금고:
        count = create_bar_chart(금고, '금고', pltcount, count)
    if 벌금:
        count = create_bar_chart(벌금, '벌금', pltcount, count)
    if 집행유예:
        count = create_bar_chart(집행유예, '집행유예', pltcount, count)
    if 사회봉사:
        count = create_bar_chart(사회봉사, '사회봉사', pltcount, count)
    if 성폭력_치료프로그램:
        count = create_bar_chart(성폭력_치료프로그램, '성폭력 치료프로그램', pltcount, count)
    if 피고인_정보공개:
        count = create_bar_chart(피고인_정보공개, '피고인 정보공개', pltcount, count)
    if 아동_청소년_장애인복지시설_취업제한:
        count = create_bar_chart(아동_청소년_장애인복지시설_취업제한, '아동 청소년 장애인복지시설 취업제한', pltcount, count)
    if 준법운전강의:
        count = create_bar_chart(준법운전강의, '준법운전강의', pltcount, count)

    return fig1,fig2


# 함수 실행
fig1, fig2 = result(sentences)
plt.show()