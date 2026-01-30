package com.barotago.backend.subway.dto;

public class SubwayArrivalDTO {
	private String updnLine;
	private String trainLineNm;
	private String arvlMsg2;
	private String arvlMsg3;
	private String btrainSttus;
	private String barvlDt;
	public SubwayArrivalDTO() {
		// TODO Auto-generated constructor stub
	}
	public SubwayArrivalDTO(String updnLine, String trainLineNm, String arvlMsg2, String arvlMsg3, String btrainSttus, String barvlDt) {
		this.updnLine = updnLine;
        this.trainLineNm = trainLineNm;
        this.arvlMsg2 = arvlMsg2;
        this.arvlMsg3 = arvlMsg3;
        this.btrainSttus = btrainSttus;
        this.barvlDt = barvlDt;
	}
	
	public String getUpdnLine() {
		return updnLine;
	}
	public void setUpdnLine(String updnLine) {
		this.updnLine = updnLine;
	}
	public String getTrainLineNm() {
		return trainLineNm;
	}
	public void setTrainLineNm(String trainLineNm) {
		this.trainLineNm = trainLineNm;
	}
	public String getArvlMsg2() {
		return arvlMsg2;
	}
	public void setArvlMsg2(String arvlMsg2) {
		this.arvlMsg2 = arvlMsg2;
	}
	public String getArvlMsg3() {
		return arvlMsg3;
	}
	public void setArvlMsg3(String arvlMsg3) {
		this.arvlMsg3 = arvlMsg3;
	}
	public String getBtrainSttus() {
		return btrainSttus;
	}
	public void setBtrainSttus(String btrainSttus) {
		this.btrainSttus = btrainSttus;
	}
	public String getBarvlDt() {
		return barvlDt;
	}
	public void setBarvlDt(String barvlDt) {
		this.barvlDt = barvlDt;
	}
	
}
