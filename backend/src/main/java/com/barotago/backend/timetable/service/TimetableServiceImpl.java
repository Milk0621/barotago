package com.barotago.backend.timetable.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.barotago.backend.timetable.dao.TimetableDAO;
import com.barotago.backend.timetable.dto.TimetableItemDTO;

@Service
public class TimetableServiceImpl implements TimetableService {
	
	private final TimetableDAO timetableDAO;
	
	public TimetableServiceImpl(TimetableDAO timetableDAO) {
		this.timetableDAO = timetableDAO;
	}

	@Override
    public List<TimetableItemDTO> getTimetable(String stationCd, int weekTag) {

        // DB에서 시간표 원본 데이터 조회
        List<Map<String, Object>> rows = timetableDAO.selectTimetableRaw(stationCd, weekTag);

        // 시간(hour)을 기준으로 묶기 위한 Map
        Map<String, TimetableItemDTO> timetableMap =  new LinkedHashMap<>();

        // DB에서 가져온 데이터 한 줄씩 처리
        for (int i = 0; i < rows.size(); i++) {

            Map<String, Object> row = rows.get(i);

            // hour 값 꺼내기 (Object → int)
            int hourValue = ((Number) row.get("hour")).intValue();

            // 5 → "05" 처럼 두 자리 문자열로 변환
            String hour = String.format("%02d", hourValue);

            // 상행/하행 구분 값 (1 = 상행, 2 = 하행)
            int inoutTag = ((Number) row.get("inout_tag")).intValue();

            // 분 값은 SQL에서 이미 문자열로 가져옴
            String minute = (String) row.get("minute");

            // 해당 시간(hour)에 대한 객체가 이미 있는지 확인
            TimetableItemDTO item = timetableMap.get(hour);

            // 없으면 새로 생성해서 Map에 넣기
            if (item == null) {
                item = new TimetableItemDTO(hour);
                timetableMap.put(hour, item);
            }

            // 상행 / 하행에 따라 분 추가
            if (inoutTag == 1) {
                // 상행
                item.getUp().add(minute);
            } else {
                // 하행
                item.getDown().add(minute);
            }
        }

        // Map → List 변환해서 반환
        return new ArrayList<>(timetableMap.values());
    }
	
}
