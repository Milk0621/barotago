package com.barotago.backend.subway.dao.mapper;

import com.barotago.backend.subway.domain.ServiceLine;
import com.barotago.backend.subway.dto.LineStationResponseDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SubwayMapper {
    List<ServiceLine> selectMainLines();											// 상위 노선 조회 (1호선, 2호선, ...)
    List<ServiceLine> selectChildLines(@Param("parentCode") String parentCode);		// 하위 노선 조회 (병점기지선, 경부고속선, ...)
    List<LineStationResponseDTO> findStationByLineCode(@Param("lineCode") String lineCode);
}
