import './SubwayLine.css';

// 지하철 노선 자르기
// 총 20개의 역을 7개씩 자른다고 했을 때 arr.length = 20, size = 7
// for문으로 size만큼 i 값을 증가시키고 배열을 i부터 i+size까지 잘라(0~6, 7~13, ...) 빈 배열에 넣음  
function chunk(arr, size) {
    const out = [];
    for(let i = 0; i < arr.length; i += size) {
        out.push(arr.slice(i, i + size));
    }
    return out;
}

// 노선 컴포넌트
function SubwayLine({name, color, stations, size}) {

    const rows = chunk(stations, size);

    return (
        <>
            <div className="line-wrap" style={{"--cols": size}}>
                {rows.map((row, rIdx) => {
                    const isEvenRow = rIdx % 2 === 0;                       
                    // 짝수번째 배열(행)이면 true, 왼 -> 오
                    const hasNext = rIdx < rows.length - 1;                 
                    // 마지막 행이 아니면 true, CSS 세로 연결선 그릴 용도
                    const ordered = isEvenRow ? row : [...row].reverse();   
                    // 지그재그를 만들기 위해 행의 표시 순서 변경 (짝수 행: 왼->오, 홀수 행: 오->왼)
                    // [...] 스프레드로 복사한 뒤 .reverse()으로 뒤집어, 원본 훼손 X

                    console.log(ordered);
                    
                    return (
                        <div key={rIdx} className={`stations ${isEvenRow ? "stations-ltr" : "stations-rtl"} ${hasNext ? isEvenRow ? "row-connector-r" : "row-connector-l" : ""}`} style={{ '--line-color': color }}>
                            {ordered.map((st, idx) => (
                                <div className="station" key={idx}>
                                    <i className="dot" style={{borderColor: color}} />
                                    <span className="label">{st.name}</span>
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default SubwayLine;