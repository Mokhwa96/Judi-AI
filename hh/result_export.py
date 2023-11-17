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
             '피고인을 벌금 300만 원에 처한다. 피고인이 위 벌금을 납입하지 아니하는 경우 10만 원을 1일로 환산한 기간 피고인을 노역장에 유치한다. 피고인에게 40시간의 성폭력 치료프로그램 이수를 명한다. 위 벌금에 상당한 금액의 가납을 명한다. 피고인에 대하여 아동·청소년 관련기관 등과 장애인복지시설에 각 2년간 취업제한(운영 및 사실상 노무제공 금지 포함)을 명한다.']




#casename, facts, ruling 컬럼으로 이루어진 데이터 프레임에서 sentences 추출





def result(sentences):

    import matplotlib.pyplot as plt
    import re
    import matplotlib.font_manager as fm

    # 로컬실행 그래프 한글폰트설정

    font_path = 'C:/Windows/Fonts/malgun.ttf'
    font_name = fm.FontProperties(fname=font_path).get_name()
    plt.rc('font', family=font_name)

    벌금 = {}
    성폭력_치료프로그램 = {}
    피고인_정보공개 = {}
    아동_청소년_장애인복지시설_취업제한 = {}
    소송비용부담 = {}
    징역 = {}
    집행유예 = {}
    사회봉사 = {}
    준법운전강의 = {}

    for text in sentences:
        text = text.replace('0.', 'x')
        text = text.replace('1.', 'x')
        text = text.replace('2.', 'x')
        text = text.replace('3.', 'x')
        text = text.replace('4.', 'x')
        text = text.replace('5.', 'x')
        text = text.replace('6.', 'x')
        text = text.replace('7.', 'x')
        text = text.replace('8.', 'x')
        text = text.replace('9.', 'x')
        text_list = text.split('. ')

        for i in text_list:
            if '피고인을 벌금' in i:
                pattern = r'벌금 (.*?)에 처한다'
                if bool(re.search(pattern, i)):
                    money = re.search(pattern, i).group(1).replace(',','').replace(' ','').replace('(백만)','')

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

            if '성폭력' in i:
                pattern = r'(\d+시간)의 성폭력'
                if bool(re.search(pattern, i)):
                    if re.search(pattern, i).group(1) in 성폭력_치료프로그램:
                        성폭력_치료프로그램[re.search(pattern, i).group(1)] += 1
                    else:
                        성폭력_치료프로그램[re.search(pattern, i).group(1)] = 1

            if '피고인에 대한 정보' in i:
                pattern = r'\d+년'
                if bool(re.findall(pattern, i)):
                    if re.findall(pattern, i)[0] in 피고인_정보공개:
                        피고인_정보공개[re.findall(pattern, i)[0]] += 1
                    else:
                        피고인_정보공개[re.findall(pattern, i)[0]] = 1

            if '청소년 관련기관' in i:
                pattern = r'\d+년'
                if bool(re.findall(pattern, i)):
                    if re.findall(pattern, i)[0] in 아동_청소년_장애인복지시설_취업제한:
                        아동_청소년_장애인복지시설_취업제한[re.findall(pattern, i)[0]] += 1
                    else:
                        아동_청소년_장애인복지시설_취업제한[re.findall(pattern, i)[0]] = 1

            if '소송비용' in i:
                if '증인' in i:
                    if '증인비용부담' in 소송비용부담:
                        소송비용부담['증인비용부담'] += 1
                    else:
                        소송비용부담['증인비용부담'] = 1
                else:
                    if '소송비용전체부담' in 소송비용부담:
                        소송비용부담['소송비용전체부담'] += 1
                    else:
                        소송비용부담['소송비용전체부담'] = 1

            if '징역' in i:
                pattern = f'징역 (.*?)에'
                if bool(re.search(pattern, i)):
                    if re.search(pattern, i).group(1).replace('개','') in 징역:
                        징역[re.search(pattern, i).group(1).replace('개','')] += 1
                    else:
                        징역[re.search(pattern, i).group(1).replace('개','')] = 1

            if '유예' in i:
                pattern = f'(\d+년)간 위 형의 집행을 유예한다'
                if bool(re.search(pattern, i)):
                    if re.search(pattern, i).group(1) in 집행유예:
                        집행유예[re.search(pattern, i).group(1)] += 1
                    else:
                        집행유예[re.search(pattern, i).group(1)] = 1
                pattern1 = f'선고를 유예한다'
                if bool(re.search(pattern1, i)):
                    if '선고유예' in 집행유예:
                        집행유예['선고유예'] += 1
                    else:
                        집행유예['선고유예'] = 1

            if '사회봉사' in i:
                pattern = '(\d+시간)의 사회봉사'
                if bool(re.search(pattern, i)):
                    if re.search(pattern, i).group(1) in 사회봉사:
                        사회봉사[re.search(pattern, i).group(1)] += 1
                    else:
                        사회봉사[re.search(pattern, i).group(1)] = 1

            if '준법운전강의' in i:
                pattern = '(\d+시간)의 준법운전강의'
                if bool(re.search(pattern, i)):
                    if re.search(pattern, i).group(1) in 준법운전강의:
                        준법운전강의[re.search(pattern, i).group(1)] += 1
                    else:
                        준법운전강의[re.search(pattern, i).group(1)] = 1




    벌금 = dict(sorted(벌금.items(), key=lambda x:x[1], reverse=True))
    성폭력_치료프로그램 = dict(sorted(성폭력_치료프로그램.items(), key=lambda x:x[1], reverse=True))
    피고인_정보공개 = dict(sorted(피고인_정보공개.items(), key=lambda x:x[1], reverse=True))
    아동_청소년_장애인복지시설_취업제한 = dict(sorted(아동_청소년_장애인복지시설_취업제한.items(), key=lambda x:x[1], reverse=True))
    소송비용부담 = dict(sorted(소송비용부담.items(), key=lambda x:x[1], reverse=True))
    징역 = dict(sorted(징역.items(), key=lambda x:x[1], reverse=True))
    집행유예 = dict(sorted(집행유예.items(), key=lambda x:x[1], reverse=True))
    사회봉사 = dict(sorted(사회봉사.items(), key=lambda x:x[1], reverse=True))
    준법운전강의 = dict(sorted(준법운전강의.items(), key=lambda x:x[1], reverse=True))



    pltcount = bool(벌금)+bool(성폭력_치료프로그램)+bool(피고인_정보공개)+bool(소송비용부담)+bool(징역)+bool(집행유예)+bool(사회봉사)+bool(준법운전강의)

    count = 1

		#=========pie=========

    if bool(벌금):
        plt.subplot(2,pltcount,count)
        plt.pie(벌금.values(), labels=벌금.keys())
        plt.xlabel('벌금')
        plt.axis=('equal')
        count += 1

    if bool(성폭력_치료프로그램):
        plt.subplot(2, pltcount, count)
        plt.pie(성폭력_치료프로그램.values(), labels=성폭력_치료프로그램.keys())
        plt.xlabel('성폭력_치료프로그램')
        plt.axis = ('equal')
        count += 1

    if bool(피고인_정보공개):
        plt.subplot(2, pltcount, count)
        plt.pie(피고인_정보공개.values(), labels=피고인_정보공개.keys())
        plt.xlabel('피고인_정보공개')
        plt.axis = ('equal')
        count += 1

    if bool(소송비용부담):
        plt.subplot(2, pltcount, count)
        plt.pie(소송비용부담.values(), labels=소송비용부담.keys())
        plt.xlabel('소송비용부담')
        plt.axis = ('equal')
        count += 1

    if bool(징역):
        plt.subplot(2, pltcount, count)
        plt.pie(징역.values(), labels=징역.keys())
        plt.xlabel('징역')
        plt.axis = ('equal')
        count += 1

    if bool(집행유예):
        plt.subplot(2, pltcount, count)
        plt.pie(집행유예.values(), labels=집행유예.keys())
        plt.xlabel('집행유예')
        plt.axis = ('equal')
        count += 1

    if bool(사회봉사):
        plt.subplot(2, pltcount, count)
        plt.pie(사회봉사.values(), labels=사회봉사.keys())
        plt.xlabel('사회봉사')
        plt.axis = ('equal')
        count += 1

    if bool(준법운전강의):
        plt.subplot(2, pltcount, count)
        plt.pie(준법운전강의.values(), labels=준법운전강의.keys())
        plt.xlabel('준법운전강의')
        plt.axis = ('equal')
        count += 1


    #===========bar=================


    if bool(벌금):
        plt.subplot(2, pltcount, count)
        plt.bar(벌금.keys(), 벌금.values(), color='red')
        plt.xlabel('벌금')
        plt.ylim(0, len(sentences))
        count += 1

    if bool(성폭력_치료프로그램):
        plt.subplot(2, pltcount, count)
        plt.bar(성폭력_치료프로그램.keys(), 성폭력_치료프로그램.values(), color='red')
        plt.xlabel('성폭력_치료프로그램')
        plt.ylim(0, len(sentences))
        count += 1


    if bool(피고인_정보공개):
        plt.subplot(2, pltcount, count)
        plt.bar(피고인_정보공개.keys(), 피고인_정보공개.values(), color='red')
        plt.xlabel('피고인_정보공개')
        plt.ylim(0, len(sentences))
        count += 1

    if bool(소송비용부담):
        plt.subplot(2, pltcount, count)
        plt.bar(소송비용부담.keys(), 소송비용부담.values(), color='red')
        plt.xlabel('소송비용부담')
        plt.ylim(0, len(sentences))
        count += 1


    if bool(징역):
        plt.subplot(2, pltcount, count)
        plt.bar(징역.keys(), 징역.values(), color='red')
        plt.xlabel('징역')
        plt.ylim(0, len(sentences))
        count += 1

    if bool(집행유예):
        plt.subplot(2, pltcount, count)
        plt.bar(집행유예.keys(), 집행유예.values(), color='red')
        plt.xlabel('집행유예')
        plt.ylim(0, len(sentences))
        count += 1


    if bool(사회봉사):
        plt.subplot(2, pltcount, count)
        plt.bar(사회봉사.keys(), 사회봉사.values(), color='red')
        plt.xlabel('사회봉사')
        plt.ylim(0, len(sentences))
        count += 1

    if bool(준법운전강의):
        plt.subplot(2, pltcount, count)
        plt.bar(준법운전강의.keys(), 준법운전강의.values(), color='red')
        plt.xlabel('준법운전강의')
        plt.ylim(0, len(sentences))
        count += 1


    plt.show()




#함수 실행

result(sentences)