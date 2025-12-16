package com.barotago.backend.subway.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.barotago.backend.subway.domain.ServiceLine;

public interface SubwayDAO {
	List<ServiceLine> selectMainLines();											// 상위 노선 조회 (1호선, 2호선, ...)
	List<ServiceLine> selectChildLines(@Param("parentCode") String parentCode);		// 하위 노선 조회 (병점기지선, 경부고속선, ...)
}
