package com.barotago.backend.timetable.dto;

import java.util.ArrayList;
import java.util.List;

public class TimetableItemDTO {
	private String hour;
	private List<TimetableMinuteDTO> up = new ArrayList<>();
	private List<TimetableMinuteDTO> down = new ArrayList<>();
	
	public TimetableItemDTO(String hour) {
        this.hour = hour;
    }

	public String getHour() {
		return hour;
	}

	public void setHour(String hour) {
		this.hour = hour;
	}

	public List<TimetableMinuteDTO> getUp() {
		return up;
	}

	public void setUp(List<TimetableMinuteDTO> up) {
		this.up = up;
	}

	public List<TimetableMinuteDTO> getDown() {
		return down;
	}

	public void setDown(List<TimetableMinuteDTO> down) {
		this.down = down;
	}
	
}
