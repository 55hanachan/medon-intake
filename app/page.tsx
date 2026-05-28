export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "40px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", background: "white", padding: "30px", borderRadius: "20px" }}>

        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>
          オンライン診療 事前問診
        </h1>

        <p style={{ marginBottom: "30px", color: "#555" }}>
          診療をスムーズに行うため、事前にご入力ください（3〜5分）
        </p>

        {/* STEP 1 */}
        <h2 style={{ marginTop: "20px" }}>① 基本情報</h2>

        <input placeholder="お名前" style={{ width: "100%", padding: "10px", marginTop: "10px" }} />
        <input placeholder="生年月日" style={{ width: "100%", padding: "10px", marginTop: "10px" }} />
        <input placeholder="身長(cm)" style={{ width: "100%", padding: "10px", marginTop: "10px" }} />
        <input placeholder="体重(kg)" style={{ width: "100%", padding: "10px", marginTop: "10px" }} />

        {/* STEP 2 */}
        <h2 style={{ marginTop: "30px" }}>② ご相談内容</h2>

        <select style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
          <option>体重減少相談</option>
          <option>GLP-1治療相談</option>
          <option>糖尿病相談</option>
          <option>マンジャロ継続希望</option>
          <option>その他</option>
        </select>

        {/* STEP 3 */}
        <h2 style={{ marginTop: "30px" }}>③ 現在の健康状態</h2>

        <textarea
          placeholder="現在の病気・服薬・症状など"
          style={{ width: "100%", height: "120px", padding: "10px", marginTop: "10px" }}
        />

        {/* STEP 4 */}
        <h2 style={{ marginTop: "30px" }}>④ その他</h2>

        <textarea
          placeholder="自由記述"
          style={{ width: "100%", height: "120px", padding: "10px", marginTop: "10px" }}
        />

        {/* ボタン */}
        <button
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "15px",
            background: "black",
            color: "white",
            borderRadius: "10px",
            fontSize: "16px"
          }}
        >
          問診を送信する
        </button>

      </div>
    </div>
  )
}