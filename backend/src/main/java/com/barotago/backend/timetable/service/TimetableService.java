package com.barotago.backend.timetable.service;

import java.util.List;

import com.barotago.backend.timetable.dto.TimetableItemDTO;

public interface TimetableService {
	List<TimetableItemDTO> getTimetable(String stationCd, int weekTag);
}
