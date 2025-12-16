package com.barotago.backend.subway.service;

import java.util.List;

import com.barotago.backend.subway.dto.SubwayLineResponseDTO;

public interface SubwayService {
	List<SubwayLineResponseDTO> getMainLines();
}
