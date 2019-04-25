<template>
	<view class="baseView">
		<scroll-view class="examScrollView">
			<block>
				<view class="pxTitleView">
					<label class="pxTitleLabel">{{model.sztitle}}</label>
					<label class="pxSubTitleLabel">{{'总分：' + model.zf + '分，及格分：' + model.jgf + '分，时长：' + (model.sc=='' ? '不限时':model.sc + '分钟')}}</label>
				</view>
			</block>
			
			<block v-if="model.grsjstDxList.length > 0">
				<view class="titleView_ceshi">
					<text class="titleText_ceshi">单选题</text>
				</view>
				<view class="lineView">
					<view class="rowLine1"></view>
				</view>
				<view class="subjectBaseView" v-for="(item,index) in model.grsjstDxList" :key="index">
					<view class="subjectLeftView">
						<label class="subjectCount">{{index + 1}}</label>
						<view class="scoreView">{{item.btfs + '分'}}</view>
					</view>
					<view class="subjectRightView">
						<label class="subjectTitle">{{item.stnr}}</label>
						<view class="lineView">
							<view class="rowLine2"></view>
						</view>
						<block v-for="(selectItem,selectIndex) in item.grsjstxxList" :key="selectIndex">
							<radio-group @change="radioChange(model.grsjstDxList, index, selectItem.xxbh)">
								<view :class="(selectItem.sfxz == 1 && mode == 0) ? 'choosedItemView' : 'unChooseItemView'" @click="radioChange(model.grsjstDxList, index, selectItem.xxbh)">
									<radio :value="selectIndex" :checked="selectItem.sfxz === 1" v-if="mode == 0"/>
									<view :class="(item.zqda == selectItem.xxbh && mode == 1) ? 'subjectTitleGreen' : 'subjectTitle'">{{selectItem.xxbh + '.  ' + selectItem.stxxnr}}</view>
								</view>
							</radio-group>
						</block>
						<view class="lineView" v-if="mode == 1">
							<view class="rowLine2"></view>
						</view>
						<view class="answerView" v-if="mode == 1">
							<label class="answerLabelNormal">正确答案是：</label>
							<label class="answerLabelGreen">{{item.zqda}}</label>
							<label class="answerLabelNormal" v-if="item.dtda == ''">。你未答题</label>
							<label class="answerLabelNormal" v-if="(item.zqda == item.dtda) && item.dtda != ''">。回答正确</label>
							<label class="answerLabelNormal" v-if="(item.zqda != item.dtda) && item.dtda != ''">，你的答案是：</label>
							<label class="answerLabelRed" v-if="(item.zqda != item.dtda) && item.dtda != ''">{{item.dtda}}</label>
							<label class="answerLabelNormal" v-if="(item.zqda != item.dtda) && item.dtda != ''">。回答错误 </label>
						</view>
					</view>
				</view>
			</block>
			
			<block v-if="model.grsjstFxList.length > 0">
				<view class="titleView_ceshi">
					<text class="titleText_ceshi">多选题</text>
				</view>
				<view class="lineView">
					<view class="rowLine1"></view>
				</view>
				<view class="subjectBaseView" v-for="(item,index) in model.grsjstFxList" :key="index">
					<view class="subjectLeftView">
						<label class="subjectCount">{{index + 1}}</label>
						<view class="scoreView">{{item.btfs + '分'}}</view>
					</view>
					<view class="subjectRightView">
						<label class="subjectTitle">{{item.stnr}}</label>
						<view class="lineView">
							<view class="rowLine2"></view>
						</view>
						<block v-for="(selectItem,selectIndex) in item.grsjstxxList" :key="selectIndex">
							<checkbox-group>
								<view :class="(selectItem.sfxz == 1 && mode == 0) ? 'choosedItemView' : 'unChooseItemView'" @click="checkboxChange(index, selectIndex, selectItem.xxbh)">
									<checkbox :value="selectIndex" :checked="selectItem.sfxz === 1" v-if="mode == 0"/>
									<view :class="(item.zqda == selectItem.xxbh && mode == 1) ? 'subjectTitleGreen' : 'subjectTitle'">{{selectItem.xxbh + '.  ' + selectItem.stxxnr}}</view>
								</view>
							</checkbox-group>
						</block>
						<view class="lineView" v-if="mode == 1">
							<view class="rowLine2"></view>
						</view>
						<view class="answerView" v-if="mode == 1">
							<label class="answerLabelNormal">正确答案是：</label>
							<label class="answerLabelGreen">{{item.zqda}}</label>
							<label class="answerLabelNormal" v-if="item.dtda == ''">。你未答题</label>
							<label class="answerLabelNormal" v-if="(item.zqda == item.dtda) && item.dtda != ''">。回答正确</label>
							<label class="answerLabelNormal" v-if="(item.zqda != item.dtda) && item.dtda != ''">，你的答案是：</label>
							<label class="answerLabelRed" v-if="(item.zqda != item.dtda) && item.dtda != ''">{{item.dtda}}</label>
							<label class="answerLabelNormal" v-if="(item.zqda != item.dtda) && item.dtda != ''">。回答错误 </label>
						</view>
					</view>
				</view>
			</block>
			
			<block v-if="model.grsjstSfList.length > 0">
				<view class="titleView_ceshi">
					<text class="titleText_ceshi">是非题</text>
				</view>
				<view class="lineView">
					<view class="rowLine1"></view>
				</view>
				<view class="subjectBaseView" v-for="(item,index) in model.grsjstSfList" :key="index">
					<view class="subjectLeftView">
						<label class="subjectCount">{{index + 1}}</label>
						<view class="scoreView">{{item.btfs + '分'}}</view>
					</view>
					<view class="subjectRightView">
						<label class="subjectTitle">{{item.stnr}}</label>
						<view class="lineView">
							<view class="rowLine2"></view>
						</view>
						<block v-for="(selectItem,selectIndex) in item.grsjstxxList" :key="selectIndex">
							<radio-group @change="radioChange(model.grsjstSfList, index, selectItem.xxbh)">
								<view :class="(selectItem.sfxz == 1 && mode == 0) ? 'choosedItemView' : 'unChooseItemView'" @click="radioChange(model.grsjstSfList, index, selectItem.xxbh)">
									<radio :value="selectIndex" :checked="selectItem.sfxz === 1" v-if="mode == 0"/>
									<view :class="(item.zqda == selectItem.xxbh && mode == 1) ? 'subjectTitleGreen' : 'subjectTitle'">{{selectItem.xxbh + '.  ' + selectItem.stxxnr}}</view>
								</view>
							</radio-group>
						</block>
						<view class="lineView" v-if="mode == 1">
							<view class="rowLine2"></view>
						</view>
						<view class="answerView" v-if="mode == 1">
							<label class="answerLabelNormal">正确答案是：</label>
							<label class="answerLabelGreen">{{item.zqda}}</label>
							<label class="answerLabelNormal" v-if="item.dtda == ''">。你未答题</label>
							<label class="answerLabelNormal" v-if="(item.zqda == item.dtda) && item.dtda != ''">。回答正确</label>
							<label class="answerLabelNormal" v-if="(item.zqda != item.dtda) && item.dtda != ''">，你的答案是：</label>
							<label class="answerLabelRed" v-if="(item.zqda != item.dtda) && item.dtda != ''">{{item.dtda}}</label>
							<label class="answerLabelNormal" v-if="(item.zqda != item.dtda) && item.dtda != ''">。回答错误 </label>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="TopTabView" v-if="mode == 0">
			<image class="timeImage" src="../../static/assets/time.png"></image>
			<label class="timeLabel" v-if="model.sc == ''">不限时</label>
			<uni-countdown v-if="model.sc != ''"
				:show-day="false" 
				:hour="0" 
				:minute="parseInt(model.sc)" 
				:second="0" @timeup="timeup">
			</uni-countdown>
			<button class="ceshiButtonStyle" @click="submit(true)">提交试卷</button>
		</view>
		<view class="TopTabView" v-if="mode == 1">
			<label :class="myScore >= passScore ? 'scoreLabelGreen':'scoreLabelRed'">{{'您的成绩：' + model.sjdf + '分，  ' + (myScore >= passScore ? '考试通过':'未通过')}}</label>
			<!-- <label class="timeLabel">{{parseInt(model.sjdf) > parseInt(model.jgf) ? '考试通过':'未通过'}}</label> -->
			<button class="ceshiButtonStyle" @click="examAgain">再测一次</button>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/list/uni-list/uni-list.vue'
	import uniIcon from '@/components/list/uni-icon/uni-icon.vue'
	import uniListItem from '@/components/list/uni-list-item/uni-list-item.vue'
	import prompt from '@/components/prompt/prompt.vue'
	import uniCountdown from '@/components/countDown/uni-countdown.vue'
	import config from '../../util/config.js';
	import dataConfig from '../../util/dataConfig.js';
	import request from '../../util/request.js';
	import service from '../../service.js';
	import photo from '../../util/photoUtil.js';
	import {
	    mapState
	} from 'vuex'
	export default {
			computed: mapState(['userInfo']),
			components: {uniList,uniListItem,uniIcon,prompt,uniCountdown},
			data() {
				return {
					recordid: "",
					model: {
						bt: "",
						sc: "",
						grsjrecordid: "",
						grsjstDxList: [],
						grsjstFxList: [],
						grsjstSfList: []
					},
					// 试卷模式 0-考试模式，1-成绩模式（不可编辑，通过model里是否有总成绩来判断模式）
					mode: 0,
					
					// 得分
					myScore: 0,
					// 及格分
					passScore: 0,
				}
			},
			onLoad(option) {
				this.recordid = option.recordid == null ? "" : option.recordid;
				this.getInfo(false);
			},
			methods: {
				getInfo: function (sfck) {
					var that = this;
					var param = {
						userid: that.userInfo.userid,
						szrecordid: that.recordid,
					};
					if (sfck == true) {
						param.sfck = sfck;
					}
					request.requestLoading(config.getExamInfo, param, '正在加载说明', function(res){
							that.model = res;
							that.myScore = parseInt(res.sjdf);
							that.passScore = parseInt(res.jgf);
							if (that.model.sjdf != null && that.model.sjdf != "") {// 考试完成
								that.mode = 1;
							}else {
								that.mode = 0;
							}
						},function(){//fail function
							uni.showToast({
								icon: 'none',
								title: '网络异常，请重试'
							});
						}, function(){//complete function
						
						}
					);
				},
				// 单选题/是非题
				radioChange: function(list, subjectIndex, xxbh) {
					if (this.mode == 1) {
						return;
					}
					list[subjectIndex].dtda = xxbh;
					var options = list[subjectIndex].grsjstxxList
					for (let i = 0; i < options.length; i++) {
						if (options[i].xxbh === xxbh) {
							options[i].sfxz = 1;
						}else {
							options[i].sfxz = 0;
						}
					}
					list[subjectIndex].grsjstxxList = options;
				},
				// 多选题
				checkboxChange: function(subjectIndex, selectIndex ,xxbh) {
					if (this.mode == 1) {
						return;
					}
					let sfxz = this.model.grsjstFxList[subjectIndex].grsjstxxList[selectIndex].sfxz;
					if (sfxz == 0) {
						this.model.grsjstFxList[subjectIndex].grsjstxxList[selectIndex].sfxz = 1;
					}else {
						this.model.grsjstFxList[subjectIndex].grsjstxxList[selectIndex].sfxz = 0;
					}
					
					var dtda = "";
					var options = this.model.grsjstFxList[subjectIndex].grsjstxxList
					for (let i = 0; i < options.length; i++) {
						if (options[i].sfxz == 1) {
							dtda = dtda + options[i].xxbh
						}
					}
					console.log(dtda)
					this.model.grsjstFxList[subjectIndex].dtda = dtda;
				},
				// 提交试卷
				submit: function(needAllFinish){
					var that = this;
					if (needAllFinish == true) {
						let message = that.checkAllFinish();
						if (message != "") {
							uni.showModal({
								title: '请完成所有的题目',
								content: message,
								confirmText: '确认'
							});
							return;
						}
					}
					let param = {
						userid: that.userInfo.userid,
						recordid: that.model.grsjrecordid,
						grsjstDxList: that.model.grsjstDxList,
						grsjstFxList: that.model.grsjstFxList,
						grsjstSfList: that.model.grsjstSfList,
						grsjstWdList: that.model.grsjstWdList
					};
					request.requestLoading(config.submitExam, param, '正在提交', function(res){
							that.model = res;
							that.myScore = parseInt(res.sjdf);
							that.passScore = parseInt(res.jgf);
							console.log('得分：' + that.model.sjdf + '，及格分：' + that.model.jgf)
							if (that.model.sjdf != null && that.model.sjdf != "") {// 考试完成
								that.mode = 1;
							}else {
								that.mode = 0;
							}
						},function(){//fail function
							uni.showToast({
								icon: 'none',
								title: '网络异常，请重试'
							});
						}, function(){//complete function
						
						}
					);
				},
				// 时间到
				timeup: function(){
					var that = this;
					uni.showModal({
						title: '提示',
						content: '考试时间到，请提交试卷。',
						showCancel: false,
						confirmText: '提交',
						success: function (res) {
							if (res.confirm) {
								that.submit(false);
							}
						}
					});
				},
				// 再测一次
				examAgain: function(){
					this.getInfo(true);
				},
				// 校验题目是否都做完
				checkAllFinish: function() {
					var dxMessage = "单选序号：";
					var dxFinish = true;
					for (var i = 0; i < this.model.grsjstDxList.length; i++) {
						let item = this.model.grsjstDxList[i];
						if (item.dtda == "") {
							dxMessage = dxMessage + (i + 1) +",";
							dxFinish = false;
						}
					}
					var fxMessage = "多选序号：";
					var fxFinish = true;
					for (var i = 0; i < this.model.grsjstFxList.length; i++) {
						let item = this.model.grsjstFxList[i];
						if (item.dtda == "") {
							fxMessage = fxMessage + (i + 1) +",";
							fxFinish = false;
						}
					}
					var sfMessage = "是非序号：";
					var sfFinish = true;
					for (var i = 0; i < this.model.grsjstSfList.length; i++) {
						let item = this.model.grsjstSfList[i];
						if (item.dtda == "") {
							sfMessage = sfMessage + (i + 1) +",";
							sfFinish = false;
						}
					}
					var wdMessage = "问答序号：";
					var wdFinish = true;
					for (var i = 0; i < this.model.grsjstWdList.length; i++) {
						let item = this.model.grsjstWdList[i];
						if (item.dtda == "") {
							wdMessage = wdMessage + (i + 1) +",";
							wdFinish = false;
						}
					}
					
					var message = "";
					if(dxFinish == false) {
						message = message + dxMessage + "\n";
					}
					if(fxFinish == false) {
						message = message + fxMessage + "\n";
					}
					if(sfFinish == false) {
						message = message + sfMessage + "\n";
					}
					if(wdFinish == false) {
						message = message + wdMessage + "\n";
					}
					
					return message;
				},
			}
		}
</script>

<style lang="scss">
	@import url("../../css/common.css");
	.timeImage {
		width: 30upx;
		height: 30upx;
		margin-left: 20upx;
		margin-right: 20upx;
		flex-shrink: 0; /*等比例不压缩*/
	}
	.timeLabel {
		width: 150upx;
		color: #898989;
		font-size: 24upx;
		margin-left: 20upx;
		margin-right: 20upx;
		line-height: 60upx;
	}
	.examScrollView{
		width: 95%;
		margin-top: 80upx;
		margin-bottom: 0upx;
	}
	.pxTitleView {
		width: 100%;
		height: 120upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.pxTitleLabel {
		width: 100%;
		/* height: 120upx; */
		font-size: 32upx;
		margin-left: 20upx;
		margin-right: 20upx;
		line-height: 60upx;
	}
	.pxSubTitleLabel {
		width: 100%;
		/* height: 120upx; */
		font-size: 22upx;
		margin-left: 20upx;
		margin-right: 20upx;
		line-height: 30upx;
		color: #BBBBBB;
	}
	.classImage {
		width: 100%;
		flex-shrink: 0; /*等比例不压缩*/
	}
	.controlBtnView {
		width: 100%;
		height: 120upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.countLabel {
		width: 100%;
		height: 60upx;
		text-align: center;
		color: #888888;
		line-height: 60upx;
	}
	
	.titleView_ceshi {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20upx;
		width: 100%;
		height: 80upx;
		background-color: #FFFFFF;
	}
	.titleText_ceshi {
		margin-left: 30upx;
		color: #666666;
		width: 100%;
		text-align: left;
		font-size: 32upx;
	}
	.subjectBaseView {
		width: 100%;
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #E2E2E2;
	}
	.subjectLeftView{
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
		padding: 10upx;
	}
	.subjectRightView{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.scoreView {
		padding: 5upx 20upx 5upx 20upx;
		color: #999999;
		width: 30upx;
		font-size: 20upx;
		background-color: #EEEEEE;
		border-radius: 10upx;
	}
	.subjectCount {
		font-size: 30upx;
		color: #2D68AA;
	}
	.subjectTitle {
		color: #555555;
		font-size: 26upx;
		margin-right: 30upx;
		padding: 10upx;
	}
	.subjectTitleGreen {
		color: #159722;
		font-size: 26upx;
		margin-right: 30upx;
		padding: 10upx;
	}
	.unChooseItemView {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10upx;
		margin-bottom: 1upx;
	}
	.choosedItemView {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10upx;
		background-color: #EEEEEE;
		margin-bottom: 3upx;
	}
	
	.pxTitleView {
		width: 100%;
		height: 120upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.pxTitleLabel {
		width: 100%;
		/* height: 120upx; */
		font-size: 32upx;
		margin-left: 20upx;
		margin-right: 20upx;
		line-height: 60upx;
	}
	.pxSubTitleLabel {
		width: 100%;
		/* height: 120upx; */
		font-size: 22upx;
		margin-left: 20upx;
		margin-right: 20upx;
		line-height: 30upx;
		color: #BBBBBB;
	}
	
	.lineView {
		width: 100%;
		height: 1upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.rowLine1 {
		width: 95%;
		height: 100%;
		/* background-color: #F1F1F1; */
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #F1F1F1;
	}
	.rowLine2 {
		width: 95%;
		height: 100%;
		border-bottom-width: 1px;
		border-bottom-style: dashed;
		border-bottom-color: #F1F1F1;
	}
	.rowLine3 {
		width: 95%;
		height: 100%;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #E2E2E2;
	}
	
	.scoreLabelRed {
		width: 100%;
		color: #E60000;
		font-size: 34upx;
		margin-left: 20upx;
		line-height: 60upx;
	}
	.scoreLabelGreen {
		width: 100%;
		color: #159722;
		font-size: 34upx;
		margin-left: 20upx;
		line-height: 60upx;
	}
	
	.ceshiButtonStyle {
		position: fixed;
		right: 10upx;
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		font-size: 30upx;
		background-color: #3296FA;
		margin-left: 20upx;
		margin-right: 20upx;
		border-radius: 5upx;
		color: #FFFFFF;
	}
	
	.answerView {
		width: 100%;
		padding: 20upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* justify-content: center; */
	}
	.answerLabelNormal{
		color: #666666;
		font-size: 24upx;
	}
	.answerLabelGreen{
		color: #159722;
		font-size: 30upx;
	}
	.answerLabelRed{
		color: #E60000;
		font-size: 30upx;
	}
</style>
