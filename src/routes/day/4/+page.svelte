<script>
	import { onDestroy, onMount } from 'svelte';
	import Highcharts from 'highcharts';
	/**
	 * @type {number[]}
	 */
	let hr = [];

	/**
	 * @type {number}
	 */
	let interval;
	onMount(() => {
		interval = setInterval(() => {
			fetch('https://advent.sveltesociety.dev/data/2023/day-four.json')
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
					return Promise.reject(res);
				})
				.then((data) => {
					hr.push(data.heartRate);
					hr = hr;
				});
		}, 1000);
		// @ts-ignore
		chart = Highcharts.chart(graphEl, config);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
	/**
	 *
	 * @param data {number[]}
	 * @param lastNSamples {number | 'all'}
	 */
	function runningAvg(data, lastNSamples) {
		if (lastNSamples === 'all' || data.length < lastNSamples) {
			lastNSamples = data.length;
		}
		let sum = 0;
		for (let i = 0; i < lastNSamples; i++) {
			// @ts-ignore
			sum += data.at(-1 - i);
		}
		return sum / lastNSamples;
	}

	let config = {
		chart: {
			backgroundColor: '#5c0e6d',
			style: {
				color: '#ffffff'
			}
		},
		title: null,
		yAxis: {
			title: {
				text: 'BPM'
			},
			max: 200,
			min: 30,
			labels: {
				style: {
					color: '#ffffff'
				}
			}
		},
		xAxis: {
			labels: {
				style: {
					color: '#ffffff'
				}
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			itemStyle: {
				color: '#ffffff'
			}
		},

		series: [
			{
				name: 'Heart Rate',
				color: '#f1d302',
				data: []
			}
		]
	};

	/**
	 * @type {number | 'all'}
	 */
	let selectVal;
	/**
	 * @type {HTMLDivElement}
	 */
	let graphEl;
	/**
	 * @type {Highcharts.Chart}
	 */
	let chart;

	$: if (chart) {
		chart.series[0].setData(hr);
	}
</script>

<div class="wrapper">
	<h1>Santa’s Heart Rate Monitor (SHRM™)</h1>
	<section>
		<h2>Santas Heart Rate right now</h2>

		<div class="realtime-wrapper">
			<div class="realtime-top"></div>
			<div class="realtime red">
				<p>{hr.at(-1) ?? NaN} bpm</p>
			</div>
		</div>
	</section>
	<section>
		<h2>
			Santas Heart Rate last <select bind:value={selectVal}>
				<option value="10"> 10 seconds </option>
				<option value="30"> 30 seconds </option>
				<option value="60"> 1 minute </option>
				<option value="300"> 5 minutes </option>
				<option value="600"> 10 minutes </option>
				<option value="1800"> 30 minutes </option>
				<option value="all"> All Data </option>
			</select>
		</h2>
		<div class="realtime-wrapper">
			<div class="realtime-top"></div>
			<div class="realtime purple">
				<p>{Math.round(runningAvg(hr, selectVal))} bpm</p>
			</div>
		</div>
	</section>
	<section class="graph-wrapper">
		<h2>Santas Heart Rate over time</h2>
		<div class="graph" bind:this={graphEl}></div>
	</section>
</div>

<style>
	.realtime-wrapper {
		position: relative;
		width: min-content;
		margin-top: 50px;
	}
	.realtime {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
	}

	.realtime.purple {
		background-color: var(--christmas-purple);
	}
	.realtime.red {
		background-color: var(--christmas-red);
	}
	.realtime-top {
		position: absolute;
		top: -35px;
		z-index: -1;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--christmas-gold);
		width: 30px;
		height: 40px;
	}
	.wrapper {
		padding: 0 1rem 1rem 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.graph-wrapper {
		grid-column: 1 / span 2;
	}
	h1 {
		text-align: center;
		grid-column: 1 / span 2;
	}
</style>
