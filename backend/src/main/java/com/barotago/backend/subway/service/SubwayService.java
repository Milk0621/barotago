package com.barotago.backend.subway.service;

import java.util.List;

import com.barotago.backend.subway.domain.ServiceLine;

public interface SubwayService {
	List<ServiceLine> getMainLines();
}
