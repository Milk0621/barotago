package com.barotago.backend.subway.dto;

public class LineStationResponseDTO {
	private String stationCd;
	private String stationName;
	private int sequenceNo;
	
	public String getStationCd() {
		return stationCd;
	}
	public void setStationCd(String stationCd) {
		this.stationCd = stationCd;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	public int getSequenceNo() {
		return sequenceNo;
	}
	public void setSequenceNo(int sequenceNo) {
		this.sequenceNo = sequenceNo;
	}
	
}
