//map, keyword
//overlay
//cluster


/**
 * MAP AND KEYWORD  
 */
var markers = [];   // 마커를 담을 배열입니다

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
  };

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// overlay for Drawing Manager
var options = {
  map: map, // Drawing Manager로 그리기 요소를 그릴 map 객체입니다
  drawingMode: [ // drawing manager로 제공할 그리기 요소 모드입니다
    kakao.maps.drawing.OverlayType.CIRCLE,
  ],
  // 사용자에게 제공할 그리기 가이드 툴팁입니다
  // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정합니다
  guideTooltip: ['draw', 'drag', 'edit'],
  circleOptions: {
    draggable: true,
    removable: true,
    editable: true,
    strokeColor: '#39f',
    fillColor: '#39f',
    fillOpacity: 0.5
  },
};

// 위에 작성한 옵션으로 Drawing Manager를 생성합니다
var manager = new kakao.maps.drawing.DrawingManager(options);


//mousemove event - 장소 개수 표현
kakao.maps.event.addListener(map, 'mousemove', function () {
  getDataFromDrawingMap()
  console.log('mousemove event!')  
});

//지도 클릭하면 원, 장소개수 초기화
kakao.maps.event.addListener(map, 'click', function () {
  manager.undo()
  document.getElementById('totalCnt').innerText = 0
});

//원 드래그시 초기화




// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {
  manager.undo();

  var keyword = document.getElementById('keyword').value;

  if (!keyword.replace(/^\s+|\s+$/g, '')) {
    alert('키워드를 입력해주세요!');
    return false;
  }

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword, placesSearchCB);        //keyword, callback
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {

    // 정상적으로 검색이 완료됐으면
    // 검색 목록과 마커를 표출합니다
    displayPlaces(data);

    // 페이지 번호를 표출합니다
    displayPagination(pagination);

  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

    alert('검색 결과가 존재하지 않습니다.');
    return;

  } else if (status === kakao.maps.services.Status.ERROR) {

    alert('검색 결과 중 오류가 발생했습니다.');
    return;

  }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

  var listEl = document.getElementById('placesList'),
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(),
    bounds = new kakao.maps.LatLngBounds(),
    listStr = '';

  // 검색 결과 목록에 추가된 항목들을 제거합니다
  removeAllChildNods(listEl);

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();

  for (var i = 0; i < places.length; i++) {

    // 마커를 생성하고 지도에 표시합니다
    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
      marker = addMarker(placePosition, i),
      itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(placePosition);

    // 마커와 검색결과 항목에 mouseover 했을때
    // 해당 장소에 인포윈도우에 장소명을 표시합니다
    // mouseout 했을 때는 인포윈도우를 닫습니다
    (function (marker, title) {
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        displayInfowindow(marker, title);
        // console.log('marker 클릭 정보! '+marker.getPosition().getLat()+' : '+marker.getPosition().getLng())
      });

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
      });

      itemEl.onmouseover = function () {
        displayInfowindow(marker, title);
      };

      itemEl.onmouseout = function () {
        infowindow.close();
      };
    })(marker, places[i].place_name);

    fragment.appendChild(itemEl);
  }

  // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
  listEl.appendChild(fragment);
  menuEl.scrollTop = 0;

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

  var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
      '<div class="info">' +
      '   <h5>' + places.place_name + '</h5>';

  if (places.road_address_name) {
    itemStr += '    <span>' + places.road_address_name + '</span>' +
      '   <span class="jibun gray">' + places.address_name + '</span>';
  } else {
    itemStr += '    <span>' + places.address_name + '</span>';
  }

  itemStr += '  <span class="tel">' + places.phone + '</span>' +
    '</div>';

  el.innerHTML = itemStr;
  el.className = 'item';

  return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
  var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
    imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
    imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage
    });

  marker.setMap(map); // 지도 위에 마커를 표출합니다
  markers.push(marker);  // 배열에 생성된 마커를 추가합니다

  return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
  var paginationEl = document.getElementById('pagination'),
    fragment = document.createDocumentFragment(),
    i;

  // 기존에 추가된 페이지번호를 삭제합니다
  while (paginationEl.hasChildNodes()) {
    paginationEl.removeChild(paginationEl.lastChild);
  }

  for (i = 1; i <= pagination.last; i++) {
    var el = document.createElement('a');
    el.href = "#";
    el.innerHTML = i;

    if (i === pagination.current) {
      el.className = 'on';
    } else {
      el.onclick = (function (i) {
        return function () {
          manager.undo();
          pagination.gotoPage(i);
        }
      })(i);
    }

    fragment.appendChild(el);
  }
  paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
  var content = '<div style="padding:5px;z-index:1;"> 지금 이곳은 ? ' + title + '</div>';

  infowindow.setContent(content);
  infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}









/**
 * OVERLAY CIRCLE
 */
// 마커 클러스터러를 생성합니다 
// var clusterer = new kakao.maps.MarkerClusterer({
//     map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
//     averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
//     minLevel: 10 // 클러스터 할 최소 지도 레벨 
// });


//empty 값 check
// var isEmpty = function(value){ 
//   if( value == "" || 
//       value == null || 
//       value == undefined || 
//       ( value != null && typeof value == "object" && !Object.keys(value).length ) 
//   ){ 
//     return true 
//   } else { 
//     return false 
//   } 
// };

// 원 역역 선택
function selectOverlay() {

  //현 위치에서 선택 
  // var level = map.getLevel();
  // console.log('zoom!'+level)

  //text 초기화
  document.getElementById('totalCnt').innerText = 0;

  // 그리기 중이면 그리기를 취소합니다
  manager.cancel();
  manager.undo();

  // 클릭한 그리기 요소 타입을 선택합니다
  manager.select(kakao.maps.drawing.OverlayType['CIRCLE']);
}


//원 내부의 정보 가져오기
function getDataFromDrawingMap() {
  
  // // 그려진 마커 객체와 원 객체만 가져온다 
  // var data = manager.getOverlays([kakao.maps.drawing.OverlayType.CIRCLE]);
  // console.log('getOVerlay 결과 : '+data[0].LatLngBounds)

  // Drawing Manager에서 그려진 데이터 정보를 가져옵니다 
  var data = manager.getData();

  // 지도에 가져온 데이터로 도형들을 그립니다
  var circles = data[kakao.maps.drawing.OverlayType.CIRCLE];
  var len = circles.length, i = 0;

  for (; i < len; i++) {
    //console.log('몇번 ?')
    var sPoint = circles[i].sPoint;
    var ePoint = circles[i].ePoint;
    
    // 마커가 표시될 위치입니다 
    // var markerPosition = new kakao.maps.LatLng(sPoint.y, sPoint.x);
    // var markerPosition02 = new kakao.maps.LatLng(ePoint.y, ePoint.x);

    // 마커를 생성합니다
    // var marker = new kakao.maps.Marker({
    //   position: markerPosition
    // });

    // console.log('type: '+type);
    // console.log('sPoint: '+sPoint.y + " : "+sPoint.x);
    // console.log('ePoint: '+ePoint.y + " : "+ePoint.x);

    var cnt = 0
    for (var i = 0; i < markers.length; i++) {
      var lat = markers[i].getPosition().getLat()
      var lng = markers[i].getPosition().getLng()
      
      // console.log('marker'+i+' 의 위치 : '+ lat + " : "+lng);
      
      var result = (sPoint.y < lat) && (lat < ePoint.y)
      var result02 = (sPoint.x < lng) && (lng < ePoint.x)
      
      if(result && result02) {
        // console.log('result : '+result+" : "+sPoint.y+" : "+lat+" : "+ePoint.y);
        // console.log('result02 : '+result02+" : "+sPoint.x+" : "+lng+" : "+ePoint.x);
        // console.log('marker'+i+' 의 위치 : '+ lat + " : "+lng);
        cnt = cnt+1;
      }
    }

    //console.log('cnt : '+cnt);
    document.getElementById('totalCnt').innerText = cnt;

    // var marker02 = new kakao.maps.Marker({
    //   position: markerPosition02
    // });

    // 마커가 지도 위에 표시되도록 설정합니다
    // marker.setMap(map);
    // marker02.setMap(map);
  }
}











/**
 * POLYGON  
 */
$.getJSON("./geoKr.json", function(geojson){
  var data = geojson.features;
  var coordinates = [];
  var name="";

  $.each(data, function(index, val) {
    coordinates = val.geometry.coordinates;
    name = val.properties.SIG_KOR_NM;

    displayArea(coordinates, name);
  })

})

var polygon = [];

//행정구역 폴리곤
function displayArea(coordinates, name) {
  var path=[];
  var points = [];

  $.each(coordinates[0], function(index, coordinates) {
    var point = new Object();
    point.x = coordinates[1];
    point.y = coordinates[0];
    points.push(point)
    path.push(new kakao.map.LatLng(point.x, point.y))
  })

  var polygon = new kakao.maps.Polygon
}

// 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다
var polygonPath = [
  new kakao.maps.LatLng(33.45133510810506, 126.57159381623066),
  new kakao.maps.LatLng(33.44955812811862, 126.5713551811832),
  new kakao.maps.LatLng(33.449986291544086, 126.57263296172184),
  new kakao.maps.LatLng(33.450682513554554, 126.57321034054742),
  new kakao.maps.LatLng(33.451346760004206, 126.57235740081413) 
];

// 지도에 표시할 다각형을 생성합니다
var polygon = new kakao.maps.Polygon({
  path:polygonPath, // 그려질 다각형의 좌표 배열입니다
  strokeWeight: 3, // 선의 두께입니다
  strokeColor: '#39DE2A', // 선의 색깔입니다
  strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
  strokeStyle: 'longdash', // 선의 스타일입니다
  fillColor: '#A2FF99', // 채우기 색깔입니다
  fillOpacity: 0.7 // 채우기 불투명도 입니다
});

// 지도에 다각형을 표시합니다
polygon.setMap(map);
