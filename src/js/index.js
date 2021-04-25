
async function isRequestActive() {
	const urlParams = new URLSearchParams(window.location.search);
	const streamer = urlParams.get('streamer');

  let streamerResponse = await fetch('https://api.streamersonglist.com/v1/streamers/' + streamer);
  let streamrData = await streamerResponse.json();

  var maxRequests = streamrData.maxRequests;
  var requestsActive = streamrData.requestsActive;

  let queueResponse = await fetch('https://api.streamersonglist.com/v1/streamers/' + streamer + '/queue');
  let queueData = await queueResponse.json();

  var songsPlayedToday = queueData.status.songsPlayedToday;
  var songsInQueue = queueData.list.length;

  return requestsActive === true && (songsPlayedToday + songsInQueue < maxRequests);
}

var checkAndUpdateStatus = function() {
	isRequestActive()
		.then(function(isActive) {
			var status = document.getElementById("status");
			var newStatus = document.createElement("span");
			newStatus.id = "status";

			if (isActive === true) {
				newStatus.innerHTML = "ON";
				newStatus.style.color = "#108e54";
			} else {
				newStatus.innerHTML = "OFF";
				newStatus.style.color = "#c63c34";
			}
			status.parentNode.replaceChild(newStatus, status);
		})
		.catch(reason => console.log(reason.message));
};

checkAndUpdateStatus();
setInterval(function() { checkAndUpdateStatus(); }, 20000);
