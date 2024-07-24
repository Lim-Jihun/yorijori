const conn = require("./db");


// 사용자 정보 조회 및 저장을 위한 객체
const user = {
    // 모든 사용자 정보 조회
    getAll: (callback) =>{
    conn.query("SELECT * FROM Users", callback);   // 쿼리 실행 후, callback 함수를 실행하여 sql문 결과 불러옴
    },

    // 특정 사용자 정보 조회 (예시 : ID로 조회)
    getById: (id, callback) => {
        const sql = "SELECT * FROM Users WHERE user_id = ?";
        conn.query(sql, [id], callback);
    },
    
     // 사용자 정보를 DB에 저장
     // create 메서드를 통해 프론트에서 받은 회원가입 정보를 user테이블에 삽입
    create: (userInfo, callback) => {
        const sql = `INSERT INTO Users (user_id, user_pw, user_name, user_nick, user_gender, user_phone, user_email, joined_at) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;
        const { user_id, user_pw, user_name, user_nick, user_gender, user_phone, user_email } = userInfo;
        conn.query(sql, [user_id, user_pw, user_name, user_nick, user_gender, user_phone, user_email], callback);
    },

    // 사용자 이름으로 조회
    // findByUsername 메서드 추가 : 회원가입,로그인 라우터에서 중복 체크할 때 사용
    findByUsername: (username) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Users WHERE user_id = ?";
            conn.query(sql, [username], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
};


module.exports = user;