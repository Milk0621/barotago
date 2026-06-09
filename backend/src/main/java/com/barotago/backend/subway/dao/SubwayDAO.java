package com.barotago.backend.subway.dao;

import com.barotago.backend.subway.domain.ServiceLine;
import com.barotago.backend.subway.dto.LineStationResponseDTO;

import java.util.List;

public interface SubwayDAO {
	List<ServiceLine> selectMainLines();											// 상위 노선 조회 (1호선, 2호선, ...)
	List<ServiceLine> selectChildLines(String parentCode);		// 하위 노선 조회 (병점기지선, 경부고속선, ...)
	List<LineStationResponseDTO> findStationByLineCode(String lineCode);
}
