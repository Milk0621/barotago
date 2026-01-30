package com.barotago.backend.subway.service;

import java.util.List;

import com.barotago.backend.subway.dto.LineStationResponseDTO;
import com.barotago.backend.subway.dto.SubwayArrivalDTO;
import com.barotago.backend.subway.dto.SubwayChildLineResponseDTO;
import com.barotago.backend.subway.dto.SubwayLineResponseDTO;

public interface SubwayService {
	List<SubwayLineResponseDTO> getMainLines();
	List<SubwayChildLineResponseDTO> getChildLines(String parentCode);
	List<LineStationResponseDTO> getStationsByLine(String lineCode);
	// 역 이름으로 실시간 도착정보 조회
	List<SubwayArrivalDTO> getRealtimeArrival(String stationName);
}
