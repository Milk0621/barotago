package com.barotago.backend.subway.dao;

import java.util.List;

import com.barotago.backend.subway.domain.ServiceLine;

public interface SubwayDAO {
	List<ServiceLine> selectMainLines();
}
