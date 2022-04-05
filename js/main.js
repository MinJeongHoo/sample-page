/*conatiner*/
const container = document.querySelector(".container");
/*popup*/
const popup = document.querySelector(".popup");
/*closeBtn*/
const closeBtn = document.querySelector(".btn-x");
/*팝업 닫기 함수*/
const closePopup = () => {
  /*hide 클래스 추가로 숨김*/
  popup.classList.add("hide");
  location.reload();
};
/*popup 열기*/
const openPopup = (capital, language, nationality) => {
  popup.classList.remove("hide");
  const popBody = document.querySelector(".popup-body");
  popBody.innerHTML = `<p>${capital}</p><p>${language}</p><p>${nationality}</p>`;
};

/*page 이동(노드서버로 호출)*/
const movePage = (capital, language, nationality) => {
  location.href = `/detail/${capital}/${language}/${nationality}`;
};
/*HTML 동적으로 만들기*/
const makeHtml = (capital, language, nationality) => {
  return `
  <div class="cardbox">
    <p>${capital}</p>
    <p>${language}</p>
    <p>${nationality}</p>
    <div>
      <button class="btn-page" data-capital =${capital} data-language = ${language} data-nationality=${nationality}>Move Page!</button>
      <button class="btn-pop" data-capital =${capital} data-language = ${language} data-nationality=${nationality}>Open pop!</button>
    </div>
  </div>`;
};
/*시작 외부 api 데이터 가져오기 async는 비동기 함수로 큰 데이터를 가져올때 비동기 처리를 위해 사용*/
const init = async () => {
  const result = await fetch(
    "https://random-data-api.com/api/nation/random_nation?size=30"
  );
  const data = await result.json();
  const htmlArr = data.map(({ capital, language, nationality }) => {
    return makeHtml(capital, language, nationality);
  });
  container.innerHTML = htmlArr.join("");
};
/*버튼 event 등록 event delegation으로 작업 (부모 선택자를 클릭했을때 자식 요소가 클릭되면 이벤트가 동작되게 함)*/
container.addEventListener("click", (event) => {
  const id = event.target.getAttribute("class");
  const capital = event?.target?.dataset?.capital;
  const language = event?.target?.dataset?.language;
  const nationality = event?.target?.dataset?.nationality;
  if (id === "btn-pop") {
    openPopup(capital, language, nationality);
  } else if (id === "btn-page") {
    movePage(capital, language, nationality);
  }
});
/*팝업 닫기 버튼 클릭 시 클로즈 함수 호출*/
closeBtn.addEventListener("click", () => {
  closePopup();
});
/*window.onpageshow 란
 *The pageshow event is sent to a Window when the browser displays the window's document due to navigation.
 */
window.onpageshow = function (event) {
  //console.log(window.performance);
  /*
   * window.performance
   * The Window interface's performance property returns a Performance object, which can be used to gather performance information about the current document.
   */
  if (
    event.persisted ||
    (window.performance && window.performance.navigation.type == 2)
  ) {
    /*The persisted read-only property indicates if a webpage is loading from a cache.*/
    //console.log(event.persisted);
    alert("뒤로가기 클릭");
    //location.reload();
  } else {
    //alert("새로 열린 페이지");
    init();
  }
};
