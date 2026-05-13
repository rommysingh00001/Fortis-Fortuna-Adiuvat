async function placeBet() {
  const betNumber = document.getElementById("bet-number").value;
  const amount = document.getElementById("bet-amount").value;

  if(betNumber.length !== 10) { alert("10 digit number required!"); return; }

  const { data, error } = await supabase
    .from("bets")
    .insert([{ user_id: USER_ID, bet_number: betNumber, amount: amount, current_streak:0, current_multiplier:0, status:"pending" }]);

  if(error) { alert(error.message); return; }
  alert("Bet placed!");
  loadBets();
}

async function loadBets() {
  const { data } = await supabase
    .from("bets")
    .select("*")
    .eq("user_id", USER_ID);

  const container = document.getElementById("user-bets");
  container.innerHTML = "";
  data.forEach(bet => {
    container.innerHTML += `<div class="bet-card">
      <b>Number:</b> ${bet.bet_number} | 
      <b>Amount:</b> ${bet.amount} | 
      <b>Current Streak:</b> ${bet.current_streak} | 
      <b>Multiplier:</b> ${bet.current_multiplier}x
    </div>`;
  });
}

loadBets();

// Live Result Subscription
supabase
  .from("daily_results")
  .on("UPDATE", payload => {
    const revealed = payload.new.revealed_digits || "";
    document.getElementById("live-result").innerText = "Current Reveal: " + revealed;
    updateBets(revealed);
  })
  .subscribe();

async function updateBets(revealed) {
  const { data } = await supabase
    .from("bets")
    .select("*")
    .eq("user_id", USER_ID);

  data.forEach(async bet => {
    let streak = 0, maxStreak = 0;
    for(let i=0; i<revealed.length; i++){
      if(bet.bet_number[i] === revealed[i]){
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else {
        streak = 0;
      }
    }
    let multiplier = maxStreak ? 9 * (10**(maxStreak-1)) : 0;
    await supabase
      .from("bets")
      .update({ current_streak: maxStreak, current_multiplier: multiplier })
      .eq("id", bet.id);
  });
  loadBets();
}
