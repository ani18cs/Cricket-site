import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Trophy, Menu, X, ChevronRight, Upload, Check, Lock, DollarSign, 
  FileText, AlertCircle, Trash2, User, LogOut, Gavel, Calendar, Activity, 
  Edit, Eye, Plus, UserCheck, Search, Phone, MapPin, Info, Unlock
} from 'lucide-react';

// ---------------------------------------------------------
// 🟢 YOUR SUPABASE KEYS
// ---------------------------------------------------------
const SUPABASE_URL = "https://ckiqlyreodpwnulyvktd.supabase.co";
const SUPABASE_KEY = "sb_publishable_dnzzdZhQawJgBp98iQ4Wgw_ayHg_T-E";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- 🔴 PASSWORDS ---
const ADMIN_PASSWORD = "admin"; 

const TOURNAMENT_DATA = {
  name: "Christian Premier League",
  presenter: "Methodist Mission Cricket Club",
  sponsor: "KOTE",
  description: "A celebration of unity, fellowship, and cricket. 7 Teams, 1 Trophy.",
  registrationFee: 200,
  maxPlayers: 105,
  teamBudget: 8000,
  playersPerTeam: 14,
  baseBid: 200,
  normalMaxBid: 800,
  marqueeMaxBid: 1000,
  dates: "14th March - 22nd March",
  auctionDate: "22nd February"
};

// --- TEAMS ---
const INITIAL_TEAMS = [
  { id: 1, name: "Jericho Wall Breakers", color: "#b91c1c", budget: 8000, owner: "owner1", password: "jericho123", logo: "/team1.png" },
  { id: 2, name: "Lion of Judah", color: "#d97706", budget: 8000, owner: "owner2", password: "lion123", logo: "/team2.png" },
  { id: 3, name: "Mount Zion Thunders", color: "#1d4ed8", budget: 8000, owner: "owner3", password: "zion123", logo: "/team3.png" },
  { id: 4, name: "God's Avengers", color: "#047857", budget: 8000, owner: "owner4", password: "avengers123", logo: "/team4.png" },
  { id: 5, name: "Holy Fire", color: "#be185d", budget: 8000, owner: "owner5", password: "fire123", logo: "/team5.png" },
  { id: 6, name: "King of Heaven", color: "#7c3aed", budget: 8000, owner: "owner6", password: "king123", logo: "/team6.png" },
  { id: 7, name: "Nahum Seth", color: "#0f766e", budget: 8000, owner: "owner7", password: "nahum123", logo: "/team7.png" }
];

// --- OFFICIAL FIXTURES ---
const INITIAL_MATCHES = [
  // DAY 1 – SATURDAY (14 MARCH)
  { id: 1, team1Id: 1, team2Id: 7, date: '14 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 2, team1Id: 2, team2Id: 3, date: '14 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 3, team1Id: 4, team2Id: 5, date: '14 Mar', venue: 'MMC Ground', status: 'upcoming' }, 

  // DAY 2 – SUNDAY (15 MARCH)
  { id: 4, team1Id: 1, team2Id: 3, date: '15 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 5, team1Id: 2, team2Id: 6, date: '15 Mar', venue: 'MMC Ground', status: 'upcoming' }, 

  // DAY 3 – MONDAY (16 MARCH)
  { id: 6, team1Id: 1, team2Id: 5, date: '16 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 7, team1Id: 7, team2Id: 4, date: '16 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 8, team1Id: 3, team2Id: 6, date: '16 Mar', venue: 'MMC Ground', status: 'upcoming' }, 

  // DAY 4 – TUESDAY (17 MARCH)
  { id: 9, team1Id: 1, team2Id: 6, date: '17 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 10, team1Id: 5, team2Id: 4, date: '17 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 11, team1Id: 3, team2Id: 2, date: '17 Mar', venue: 'MMC Ground', status: 'upcoming' }, 

  // DAY 5 – WEDNESDAY (18 MARCH)
  { id: 12, team1Id: 1, team2Id: 4, date: '18 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 13, team1Id: 6, team2Id: 7, date: '18 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 14, team1Id: 5, team2Id: 2, date: '18 Mar', venue: 'MMC Ground', status: 'upcoming' }, 

  // DAY 6 – THURSDAY (19 MARCH)
  { id: 15, team1Id: 1, team2Id: 2, date: '19 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 16, team1Id: 4, team2Id: 3, date: '19 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 17, team1Id: 6, team2Id: 5, date: '19 Mar', venue: 'MMC Ground', status: 'upcoming' }, 

  // DAY 7 – FRIDAY (20 MARCH)
  { id: 18, team1Id: 2, team2Id: 7, date: '20 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 19, team1Id: 4, team2Id: 6, date: '20 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 20, team1Id: 3, team2Id: 5, date: '20 Mar', venue: 'MMC Ground', status: 'upcoming' }, 

  // DAY 8 – SATURDAY (21 MARCH)
  { id: 21, team1Id: 4, team2Id: 7, date: '21 Mar', venue: 'MMC Ground', status: 'upcoming' }, 
  { id: 22, team1Id: null, team2Id: null, date: '21 Mar', venue: 'MMC Ground', status: 'scheduled', note: 'Qualifier: Rank 1 vs Rank 2' },

  // DAY 9 – SUNDAY (22 MARCH)
  { id: 23, team1Id: null, team2Id: null, date: '22 Mar', venue: 'MMC Ground', status: 'scheduled', note: 'GRAND FINAL' },
];

const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const bg = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-blue-600' };
  return (
    <div className={`fixed top-20 right-4 z-[60] ${bg[type]} text-white px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-fade-in`}>
      {type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose}><X size={16} /></button>
    </div>
  );
};

const calculateStandings = (teams, matches) => {
  return teams.map(team => {
    let played = 0, won = 0, lost = 0, draw = 0, points = 0;
    let runsFor = 0, oversFor = 0, runsAgainst = 0, oversAgainst = 0;

    matches.filter(m => m.status === 'completed').forEach(m => {
      const isTeam1 = m.team1Id === team.id;
      const isTeam2 = m.team2Id === team.id;
      if (isTeam1 || isTeam2) {
        played++;
        const myRuns = isTeam1 ? (m.team1Score || 0) : (m.team2Score || 0);
        const myOvers = isTeam1 ? (m.t1_overs || 0) : (m.t2_overs || 0);
        const oppRuns = isTeam1 ? (m.team2Score || 0) : (m.team1Score || 0);
        const oppOvers = isTeam1 ? (m.t2_overs || 0) : (m.t1_overs || 0);
        
        runsFor += myRuns; 
        oversFor += myOvers; 
        runsAgainst += oppRuns; 
        oversAgainst += oppOvers;

        if (m.winner === team.id) { won++; points += 2; }
        else if (m.winner === 0) { draw++; points += 1; }
        else { lost++; }
      }
    });

    const runRateFor = oversFor > 0 ? runsFor / oversFor : 0;
    const runRateAgainst = oversAgainst > 0 ? runsAgainst / oversAgainst : 0;
    const nrr = (runRateFor - runRateAgainst).toFixed(3);

    return { ...team, played, won, lost, draw, points, nrr };
  }).sort((a, b) => b.points - a.points || b.nrr - a.nrr);
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const [loginType, setLoginType] = useState('admin');
  const [creds, setCreds] = useState({ user: '', pass: '' });
  const [toast, setToast] = useState(null);
  
  // Data
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [bids, setBids] = useState([]);
  const [adminSearch, setAdminSearch] = useState('');
  
  const [updateModal, setUpdateModal] = useState(null);
  const [scorecardModal, setScorecardModal] = useState(null);
  const [scEntry, setScEntry] = useState({ playerId: '', runs: 0, wickets: 0, overs: 0 });

  const showToast = (msg, type = 'info') => setToast({ message: msg, type });

  const fetchData = async () => {
    const { data: regData } = await supabase.from('registrations').select('*').order('id', {ascending: false});
    if (regData) setAllRegistrations(regData);
    const { data: teamData } = await supabase.from('teams').select('*').order('id', {ascending: true});
    if (teamData) setTeams(teamData);
    const { data: matchData } = await supabase.from('matches').select('*').order('id', {ascending: true});
    if (matchData) setMatches(matchData);
    const { data: bidData } = await supabase.from('bids').select('*');
    if (bidData) setBids(bidData);
  };

  useEffect(() => {
    fetchData();
    const subscription = supabase.channel('public:all').on('postgres_changes', { event: '*', schema: 'public' }, () => fetchData()).subscribe();
    return () => { supabase.removeChannel(subscription); };
  }, []);

  const pendingPlayers = allRegistrations.filter(r => r.status === 'pending');
  const approvedPlayers = allRegistrations.filter(r => r.status === 'approved');

  const initializeDatabase = async () => {
    if (!window.confirm("Initialize Database?")) return;
    try {
      await supabase.from('teams').delete().neq('id', 0); 
      await supabase.from('teams').insert(INITIAL_TEAMS);
      await supabase.from('matches').delete().neq('id', 0);
      await supabase.from('matches').insert(INITIAL_MATCHES);
      showToast("Database Initialized!", "success");
      fetchData();
    } catch (e) { showToast("Init failed: " + e.message, "error"); }
  };

  const handleLogin = () => {
    if (loginType === 'admin') {
      if (creds.pass === ADMIN_PASSWORD) {
        setUserRole('admin'); setLoginModal(false); showToast("Welcome Admin", "success");
      } else { showToast("Wrong Admin Password", "error"); }
    } else {
      const owner = teams.find(t => t.owner === creds.user && t.password === creds.pass);
      if (owner) {
        setUserRole('owner'); setCurrentUser(owner); setLoginModal(false); setActiveTab('auction'); showToast(`Welcome ${owner.name}`, "success");
      } else { showToast("Invalid Owner Credentials", "error"); }
    }
    setCreds({ user: '', pass: '' });
  };

  const approvePlayer = async (id) => {
    const { error } = await supabase.from('registrations').update({ status: 'approved' }).eq('id', id);
    if (!error) showToast("Player Approved!", "success");
  };

  const deletePlayer = async (id) => {
    if(!window.confirm("Reject registration?")) return;
    await supabase.from('registrations').delete().eq('id', id);
    showToast("Rejected", "info");
  };

  // --- REGISTRATION FORM ---
  const [regForm, setRegForm] = useState({
    givenName: '', surname: '', fatherName: '', motherName: '', 
    dateOfBirth: '', permanentAddress: '', contactNo: '', email: '', 
    physicallyFit: 'YES', batsmanHand: 'Right Hand', bowlerType: 'N/A', 
    wicketKeeper: 'NO', photoUrl: null, paymentScreenshot: null, termsAccepted: false
  });

  const handleFile = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setRegForm(prev => ({ ...prev, [field]: reader.result })); 
      reader.readAsDataURL(file);
    }
  };

  const submitRegistration = async (e) => {
    e.preventDefault();
    const { data: existingPlayer } = await supabase.from('registrations').select('id').eq('contactNo', regForm.contactNo);
    if (existingPlayer && existingPlayer.length > 0) { showToast("Player already registered with this Phone Number!", "error"); return; }
    const fullName = `${regForm.givenName} ${regForm.surname}`.toUpperCase();
    try {
      await supabase.from('registrations').insert([{ ...regForm, name: fullName, teamId: null, status: 'pending' }]);
      showToast("Registration Sent! Waiting for Approval.", "success"); setActiveTab('home');
    } catch (err) { showToast("Error saving data", "error"); }
  };

  const placeBid = async (player, amount) => {
    if (amount > currentUser.budget) return showToast("Insufficient Budget", "error");
    if (amount > TOURNAMENT_DATA.marqueeMaxBid) return showToast(`Max limit is ₹${TOURNAMENT_DATA.marqueeMaxBid}`, "error");
    try { await supabase.from('bids').insert([{ playerId: player.id, teamId: currentUser.id, amount: parseInt(amount) }]); showToast(`Bid ₹${amount} Placed!`, "success"); } catch (e) { showToast("Bid Failed", "error"); }
  };

  const finalizeAuction = async () => {
    if (userRole !== 'admin') return;
    let assigned = 0;
    for (const p of approvedPlayers) {
      if (p.auctionStatus === 'pending') {
        const playerBids = bids.filter(b => b.playerId === p.id);
        if (playerBids.length > 0) {
          const highest = playerBids.reduce((max, b) => b.amount > max.amount ? b : max);
          const team = teams.find(t => t.id === highest.teamId);
          if (team) {
            await supabase.from('registrations').update({ auctionStatus: 'sold', teamId: team.id, auctionPrice: highest.amount }).eq('id', p.id);
            await supabase.from('teams').update({ budget: team.budget - highest.amount }).eq('id', team.id);
            assigned++;
          }
        }
      }
    }
    assigned > 0 ? showToast(`Sold ${assigned} players`, "success") : showToast("No bids pending", "info");
  };

  const handleMatchUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      team1Score: parseInt(formData.get('s1')) || 0,
      t1_overs: parseFloat(formData.get('o1')) || 0,
      team2Score: parseInt(formData.get('s2')) || 0,
      t2_overs: parseFloat(formData.get('o2')) || 0,
      winner: parseInt(formData.get('winner')),
      status: 'completed',
      scorecard: updateModal.scorecard || []
    };
    await supabase.from('matches').update(updates).eq('id', updateModal.id);
    showToast("Match Updated!", "success");
    setUpdateModal(null);
  };

  const addScorecardEntry = async () => {
    if(!scEntry.playerId) return;
    const player = approvedPlayers.find(p => p.id == scEntry.playerId);
    const newEntry = {
      playerId: scEntry.playerId,
      name: player.name,
      teamId: player.teamId,
      runs: parseInt(scEntry.runs),
      wickets: parseInt(scEntry.wickets),
      overs: parseFloat(scEntry.overs)
    };
    const currentScorecard = updateModal.scorecard || [];
    const updatedScorecard = [...currentScorecard.filter(e => e.playerId != newEntry.playerId), newEntry];
    await supabase.from('matches').update({ scorecard: updatedScorecard }).eq('id', updateModal.id);
    setUpdateModal({ ...updateModal, scorecard: updatedScorecard });
    setScEntry({ playerId: '', runs: 0, wickets: 0, overs: 0 });
  };

  const deleteScorecardEntry = async (pid) => {
    const updatedScorecard = updateModal.scorecard.filter(e => e.playerId !== pid);
    await supabase.from('matches').update({ scorecard: updatedScorecard }).eq('id', updateModal.id);
    setUpdateModal({ ...updateModal, scorecard: updatedScorecard });
  };

  const getPlayerRole = (p) => {
    if (p.batsmanHand !== 'Right Hand Bat' && p.batsmanHand !== 'Left Hand Bat') return 'Bowler';
    const isBowler = p.bowlerType !== 'N/A' && p.bowlerType !== 'None';
    return isBowler ? 'ALL ROUNDER' : 'BATSMAN';
  };

  const getTeam = (id) => teams.find(t => t.id === id) || {name: 'TBD', color: '#333', logo: null};
  const standings = calculateStandings(teams, matches);

  // --- AUCTION UTILS ---
  const getPlayerAuctionData = (player) => {
    const playerBids = bids.filter(b => b.playerId === player.id);
    const highestBid = playerBids.length > 0 ? Math.max(...playerBids.map(b => b.amount)) : 0;
    const highestBidderId = playerBids.length > 0 ? playerBids.reduce((max, b) => b.amount > max.amount ? b : max).teamId : null;
    const highestBidderTeam = highestBidderId ? teams.find(t => t.id === highestBidderId) : null;
    return { highestBid, highestBidderTeam };
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* NAVBAR */}
      <nav className="bg-black/40 backdrop-blur border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3" onClick={() => setActiveTab('home')}>
              <Trophy className="text-yellow-400 w-8 h-8" />
              <div>
                <h1 className="font-bold text-lg leading-none text-yellow-400">CPL T10</h1>
                <span className="text-[10px] text-gray-400 font-bold uppercase">TITLE SPONSOR: {TOURNAMENT_DATA.sponsor}</span>
              </div>
            </div>
            <div className="hidden md:flex gap-6 items-center">
              {['home', 'register', 'teams', 'players', 'matches', 'standings'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={`uppercase text-sm font-bold ${activeTab === t ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`}>{t}</button>
              ))}
              {userRole === 'admin' && <button onClick={() => setActiveTab('approvals')} className="text-red-400 font-bold uppercase text-sm flex items-center gap-1"><UserCheck size={16}/> ({pendingPlayers.length})</button>}
              {userRole === 'owner' && <button onClick={() => setActiveTab('auction')} className="text-yellow-400 font-bold uppercase text-sm animate-pulse">Live Auction</button>}
              {!userRole ? <button onClick={() => setLoginModal(true)} className="bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-500 text-sm">LOGIN</button> : <div className="flex items-center gap-4"><span className="text-xs bg-slate-800 px-2 py-1 rounded border border-white/20">{userRole === 'admin' ? 'ADMIN' : `${currentUser?.name}`}</span><button onClick={() => { setUserRole(null); setCurrentUser(null); setActiveTab('home'); }}><LogOut size={18} /></button></div>}
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2"><Menu /></button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-b border-white/10 p-4 space-y-4">
             {['home', 'register', 'teams', 'players', 'matches', 'standings'].map(t => <button key={t} onClick={() => { setActiveTab(t); setMobileMenuOpen(false); }} className="block w-full text-left uppercase font-bold text-gray-300">{t}</button>)}
             {userRole === 'admin' && <button onClick={() => { setActiveTab('approvals'); setMobileMenuOpen(false); }} className="block w-full text-left uppercase font-bold text-red-400">Approvals ({pendingPlayers.length})</button>}
             {!userRole ? <button onClick={() => { setLoginModal(true); setMobileMenuOpen(false); }} className="bg-yellow-400 text-black p-3 rounded font-bold w-full">LOGIN</button> : <button onClick={() => { setUserRole(null); setMobileMenuOpen(false); }} className="bg-red-500/20 text-red-400 p-3 rounded font-bold w-full">LOGOUT</button>}
          </div>
        )}
      </nav>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* HOME */}
        {activeTab === 'home' && (
          <div className="space-y-12 py-8 text-center">
            <div>
              <p className="text-sm md:text-xl font-bold text-yellow-500 uppercase tracking-widest mb-2 animate-pulse">{TOURNAMENT_DATA.presenter} PRESENTS</p>
              <h1 className="text-5xl md:text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 mb-4">{TOURNAMENT_DATA.name}</h1>
              <p className="text-gray-400 max-w-xl mx-auto">{TOURNAMENT_DATA.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
               {[1,2,3].map(i => <div key={i} className="aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 relative"><img src={`/hero${i}.jpg`} className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} /></div>)}
            </div>
            <div className="flex justify-center gap-4">
               <button onClick={() => setActiveTab('register')} className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition">Register Player</button>
               {userRole === 'admin' && <button onClick={initializeDatabase} className="bg-slate-800 border border-white/20 py-3 px-8 rounded-full text-xs hover:bg-slate-700">Initialize DB (Admin)</button>}
            </div>
          </div>
        )}

        {/* APPROVALS */}
        {activeTab === 'approvals' && userRole === 'admin' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><UserCheck className="text-red-400"/> PENDING APPROVALS</h2>
            <div className="grid gap-4">
              {pendingPlayers.map(p => (
                <div key={p.id} className="bg-slate-800 p-6 rounded-xl border border-white/10">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-32 h-32 bg-black rounded-lg overflow-hidden shrink-0">{p.photoUrl && <img src={p.photoUrl} className="w-full h-full object-cover" />}</div>
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-2xl text-yellow-400">{p.name}</h3>
                            <span className="bg-blue-600 text-xs px-2 py-1 rounded font-bold">{getPlayerRole(p)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-300">
                            <p><span className="text-gray-500">Father:</span> {p.fatherName}</p>
                            <p><span className="text-gray-500">Mother:</span> {p.motherName}</p>
                            <p><span className="text-gray-500">DOB:</span> {p.dateOfBirth}</p>
                            <p><span className="text-gray-500">Phone:</span> {p.contactNo}</p>
                            <p className="col-span-2"><span className="text-gray-500">Address:</span> {p.permanentAddress}</p>
                            <p className="col-span-2"><span className="text-gray-500">Email:</span> {p.email}</p>
                        </div>
                        <div className="flex gap-4 mt-2 text-xs font-mono text-yellow-500">
                            <span>🏏 {p.batsmanHand}</span>
                            <span>⚾ {p.bowlerType}</span>
                            <span>🧤 WK: {p.wicketKeeper}</span>
                        </div>
                        <div className="pt-2">
                            {p.paymentScreenshot && <a href={p.paymentScreenshot} target="_blank" className="text-blue-400 underline text-sm flex items-center gap-1"><FileText size={14}/> View Payment Screenshot</a>}
                        </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4 pt-4 border-t border-white/10 justify-end">
                      <button onClick={() => approvePlayer(p.id)} className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded font-bold">APPROVE</button>
                      <button onClick={() => deletePlayer(p.id)} className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded font-bold">REJECT</button>
                  </div>
                </div>
              ))}
              {pendingPlayers.length === 0 && <div className="text-center py-10 text-gray-500">No pending registrations.</div>}
            </div>
          </div>
        )}

        {/* PLAYERS LIST */}
        {activeTab === 'players' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">APPROVED PLAYERS</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {approvedPlayers.map(p => (
                <div key={p.id} className="bg-slate-800 p-4 rounded-xl border border-white/10 relative overflow-hidden group hover:border-yellow-400 transition">
                  <div className="h-48 bg-black/50 rounded-lg mb-3 overflow-hidden">{p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-600"><User size={40}/></div>}</div>
                  <h3 className="font-bold truncate text-lg mb-2">{p.name}</h3>
                  <div className="text-xs text-gray-400 space-y-1 bg-black/20 p-2 rounded">
                      <div className="flex items-center gap-2">🏏 <span className="text-white">{p.batsmanHand}</span></div>
                      {p.bowlerType !== 'N/A' && <div className="flex items-center gap-2">⚾ <span className="text-white">{p.bowlerType}</span></div>}
                      {p.wicketKeeper === 'YES' && <div className="flex items-center gap-2">🧤 <span className="text-yellow-400">Wicket Keeper</span></div>}
                  </div>
                  <div className="absolute top-2 right-2">
                    {p.auctionStatus === 'sold' ? <span className="bg-green-600 text-[10px] px-2 py-1 rounded font-bold shadow-lg">SOLD</span> : <span className="bg-blue-600 text-[10px] px-2 py-1 rounded font-bold shadow-lg">POOL</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REGISTER */}
        {activeTab === 'register' && (
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-2"><FileText /> Player Form</h2>
                <form onSubmit={submitRegistration} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4"><input required placeholder="First Name" className="bg-slate-900 p-3 rounded border border-white/10 w-full" value={regForm.givenName} onChange={e => setRegForm({...regForm, givenName: e.target.value.toUpperCase()})} /><input required placeholder="Surname" className="bg-slate-900 p-3 rounded border border-white/10 w-full" value={regForm.surname} onChange={e => setRegForm({...regForm, surname: e.target.value.toUpperCase()})} /></div>
                  <div className="grid grid-cols-2 gap-4"><input required placeholder="Father's Name" className="bg-slate-900 p-3 rounded border border-white/10 w-full" value={regForm.fatherName} onChange={e => setRegForm({...regForm, fatherName: e.target.value.toUpperCase()})} /><input required placeholder="Mother's Name" className="bg-slate-900 p-3 rounded border border-white/10 w-full" value={regForm.motherName} onChange={e => setRegForm({...regForm, motherName: e.target.value.toUpperCase()})} /></div>
                  <div className="grid grid-cols-2 gap-4"><input type="date" required className="bg-slate-900 p-3 rounded border border-white/10 w-full" value={regForm.dateOfBirth} onChange={e => setRegForm({...regForm, dateOfBirth: e.target.value})} /><input required placeholder="Phone (+91)" className="bg-slate-900 p-3 rounded border border-white/10 w-full" value={regForm.contactNo} onChange={e => setRegForm({...regForm, contactNo: e.target.value})} /></div>
                  <textarea required placeholder="Permanent Address" className="bg-slate-900 p-3 rounded border border-white/10 w-full h-24" value={regForm.permanentAddress} onChange={e => setRegForm({...regForm, permanentAddress: e.target.value.toUpperCase()})} />
                  <input required type="email" placeholder="Email Address" className="bg-slate-900 p-3 rounded border border-white/10 w-full" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} />
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase">Cricketing Skills</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <select className="bg-slate-900 p-3 rounded border border-white/10 w-full" value={regForm.batsmanHand} onChange={e => setRegForm({...regForm, batsmanHand: e.target.value})}><option>Right Hand Bat</option><option>Left Hand Bat</option></select>
                      <select className="bg-slate-900 p-3 rounded border border-white/10 w-full" value={regForm.bowlerType} onChange={e => setRegForm({...regForm, bowlerType: e.target.value})}><option value="N/A">Not a Bowler</option><option>Right Arm Fast</option><option>Right Arm Spin</option><option>Left Arm Fast</option><option>Left Arm Spin</option></select>
                      <div className="flex items-center gap-2 text-sm text-gray-300"><span>Wicket Keeper?</span><input type="checkbox" checked={regForm.wicketKeeper === 'YES'} onChange={e => setRegForm({...regForm, wicketKeeper: e.target.checked ? 'YES' : 'NO'})} className="w-5 h-5 accent-yellow-400" /></div>
                      <div className="flex items-center gap-2 text-sm text-gray-300"><span>Physically Fit?</span><input type="checkbox" checked={regForm.physicallyFit === 'YES'} onChange={e => setRegForm({...regForm, physicallyFit: e.target.checked ? 'YES' : 'NO'})} className="w-5 h-5 accent-yellow-400" /></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10 space-y-4">
                     <div><label className="block text-xs font-bold text-gray-500 mb-1">PLAYER PHOTO</label><input type="file" required accept="image/*" onChange={e => handleFile(e, 'photoUrl')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"/></div>
                     <div><label className="block text-xs font-bold text-gray-500 mb-1">PAYMENT SCREENSHOT</label><input type="file" required accept="image/*" onChange={e => handleFile(e, 'paymentScreenshot')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:text-black hover:file:bg-green-500"/></div>
                  </div>
                  <div className="bg-black/30 p-4 rounded text-xs text-gray-400 h-32 overflow-y-auto mb-4 border border-white/10">
                    <p className="mb-2 font-bold text-yellow-400">DECLARATION</p>
                    <p className="mb-2">1. I, hereby, declare that my parents are aware of my participation...</p>
                    <p className="mb-2">2. I, hereby, indemnify the organizers...</p>
                    <p className="mb-2">3. I hereby, give my consent for emergency medical care...</p>
                    <p className="mb-2">4. I hereby, give my consent to photos/videos...</p>
                    <p>5. I hereby, declare that all details are true...</p>
                  </div>
                  <label className="flex gap-3 items-start"><input type="checkbox" required checked={regForm.termsAccepted} onChange={e => setRegForm({...regForm, termsAccepted: e.target.checked})} className="mt-1 w-5 h-5 accent-yellow-400" /><span className="text-xs text-gray-400 leading-relaxed">I have read the declaration above and agree to the terms and conditions.</span></label>
                  <button type="submit" disabled={!regForm.termsAccepted} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 rounded-lg hover:brightness-110 disabled:opacity-50">SUBMIT REGISTRATION</button>
                </form>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white text-black p-6 rounded-xl text-center shadow-xl">
                 <h3 className="font-bold text-lg mb-4">SCAN TO PAY</h3>
                 <div className="border-2 border-dashed border-gray-300 p-2 rounded mb-4"><img src="/qr.jpeg" className="w-full h-auto" onError={(e) => e.target.parentElement.innerHTML='QR Code Missing (public/qr.jpeg)'} /></div>
                 <div className="space-y-2 font-mono text-sm"><div className="bg-gray-100 p-2 rounded">HANOCK</div><div className="bg-gray-100 p-2 rounded">hanockrebu@ybl</div></div>
                 <div className="mt-4 bg-yellow-100 p-3 rounded text-sm text-yellow-800 font-bold">Registration: ₹200</div>
              </div>
            </div>
          </div>
        )}

        {/* TEAMS */}
        {activeTab === 'teams' && (
          <div className="grid md:grid-cols-3 gap-6">
             {teams.map(t => (
               <div key={t.id} className="bg-slate-800 p-6 rounded-xl border border-white/5 relative overflow-hidden">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-black flex items-center justify-center overflow-hidden">
                     {t.logo ? <img src={t.logo} className="w-full h-full object-cover" /> : <span className="text-xs">{t.name[0]}</span>}
                   </div>
                   <div><h3 className="font-bold text-lg">{t.name}</h3></div>
                 </div>
                 <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-4"><div className="h-full bg-white" style={{width: `${(t.budget/TOURNAMENT_DATA.teamBudget)*100}%`}}></div></div>
                 <div className="bg-black/20 p-3 rounded h-40 overflow-y-auto space-y-1">
                   {approvedPlayers.filter(r => r.teamId === t.id).map(p => <div key={p.id} className="text-xs flex justify-between"><span>{p.name}</span><span className="text-green-400">₹{p.auctionPrice}</span></div>)}
                 </div>
               </div>
             ))}
          </div>
        )}

        {/* MATCHES (UPDATED FIXTURES WITH LOGOS) */}
        {activeTab === 'matches' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div><h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2"><Check /> MATCH RESULTS</h3>
              <div className="grid gap-4">
                {matches.filter(m => m.status === 'completed').map(m => {
                  const t1 = getTeam(m.team1Id); const t2 = getTeam(m.team2Id); const winner = m.winner === 0 ? {name: 'DRAW'} : getTeam(m.winner);
                  return (
                    <div key={m.id} className="bg-slate-800 p-4 rounded-xl border-l-4 border-green-500 flex flex-col relative group">
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-right flex-1"><div className="font-bold">{t1.name}</div><div className="font-mono text-yellow-400">{m.team1Score}/{m.t1_overs}</div></div>
                        <div className="px-4 text-center"><div className="text-xs font-bold text-gray-500">VS</div><div className="text-xs text-green-400 font-bold mt-1">{winner.name === 'DRAW' ? 'MATCH DRAWN' : `${winner.name} WON`}</div></div>
                        <div className="text-left flex-1"><div className="font-bold">{t2.name}</div><div className="font-mono text-yellow-400">{m.team2Score}/{m.t2_overs}</div></div>
                        {userRole === 'admin' && <button onClick={() => setUpdateModal(m)} className="absolute right-0 top-0 text-gray-400 hover:text-white p-2"><Edit size={16}/></button>}
                      </div>
                      <div className="border-t border-white/10 pt-2 flex justify-center"><button onClick={() => setScorecardModal(m)} className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold uppercase"><Eye size={12}/> View Scorecard</button></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div><h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2"><Calendar /> UPCOMING FIXTURES</h3>
              <div className="grid gap-4">
                {matches.filter(m => m.status !== 'completed').map(m => {
                  const t1 = getTeam(m.team1Id); const t2 = getTeam(m.team2Id);
                  return (
                    <div key={m.id} className="bg-slate-800 p-4 rounded-xl border border-white/5 flex justify-between items-center relative overflow-hidden">
                      <div className="flex-1 flex items-center justify-end gap-3">
                          <span className="font-bold text-right">{t1.name || (m.team1Id ? 'TBD' : 'Rank/Winner')}</span>
                          {t1.logo && <img src={t1.logo} className="w-8 h-8 object-cover rounded-full bg-black/50" />}
                      </div>
                      
                      <div className="px-4 text-center z-10 shrink-0 min-w-[100px]">
                          <div className="text-[10px] text-yellow-500 font-bold mb-1">{m.date}</div>
                          <div className="bg-black/30 px-3 py-1 rounded text-xs text-gray-400 whitespace-nowrap">{m.venue}</div>
                          {m.note && <div className="text-[10px] text-blue-400 mt-1">{m.note}</div>}
                      </div>

                      <div className="flex-1 flex items-center justify-start gap-3">
                          {t2.logo && <img src={t2.logo} className="w-8 h-8 object-cover rounded-full bg-black/50" />}
                          <span className="font-bold text-left">{t2.name || (m.team2Id ? 'TBD' : 'Rank/Winner')}</span>
                      </div>
                      
                      {userRole === 'admin' && m.team1Id && <button onClick={() => setUpdateModal(m)} className="absolute right-0 top-0 bottom-0 bg-blue-600 px-4 text-xs font-bold hover:bg-blue-500">UPDATE</button>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STANDINGS */}
        {activeTab === 'standings' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Activity className="text-yellow-400"/> POINTS TABLE</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-black/40 text-gray-400 uppercase text-xs">
                  <tr><th className="p-4">Team</th><th className="p-4 text-center">Played</th><th className="p-4 text-center">Won</th><th className="p-4 text-center">Lost</th><th className="p-4 text-center">Draw</th><th className="p-4 text-center">NRR</th><th className="p-4 text-center">Points</th></tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {standings.map((team, idx) => (
                    <tr key={team.id} className="hover:bg-white/5">
                      <td className="p-4 font-bold flex items-center gap-3"><span className="text-gray-500 w-4">{idx + 1}</span><div className="w-8 h-8 rounded-full bg-black flex items-center justify-center overflow-hidden">{team.logo ? <img src={team.logo} className="w-full h-full object-cover" /> : <div className="w-full h-full" style={{background: team.color}}></div>}</div>{team.name}</td>
                      <td className="p-4 text-center">{team.played}</td><td className="p-4 text-center text-green-400">{team.won}</td><td className="p-4 text-center text-red-400">{team.lost}</td><td className="p-4 text-center text-gray-400">{team.draw}</td><td className="p-4 text-center font-mono text-blue-300">{team.nrr}</td><td className="p-4 text-center font-bold text-yellow-400 text-lg">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AUCTION (UPDATED DYNAMIC BIDDING) */}
        {activeTab === 'auction' && userRole === 'owner' && (
          <div className="space-y-8">
             <div className="bg-yellow-400 text-black p-4 rounded-lg flex justify-between items-center">
                <h2 className="font-bold text-xl uppercase flex items-center gap-2"><Gavel /> LIVE AUCTION</h2>
                <div className="text-right"><div className="text-xs uppercase">Your Budget</div><div className="font-mono font-black text-2xl">₹{currentUser.budget}</div></div>
             </div>
             <div className="bg-slate-800 p-4 rounded-lg flex gap-4"><Search className="text-gray-400"/><input placeholder="Search players..." className="bg-transparent outline-none w-full" value={adminSearch} onChange={e => setAdminSearch(e.target.value)} /></div>
             <div className="grid md:grid-cols-2 gap-6">
               {approvedPlayers.filter(r => r.auctionStatus === 'pending' && r.name.includes(adminSearch.toUpperCase())).map(player => {
                 const { highestBid, highestBidderTeam } = getPlayerAuctionData(player);
                 const nextBidAmount = highestBid === 0 ? TOURNAMENT_DATA.baseBid : highestBid + 50;
                 const canBidNormal = nextBidAmount <= TOURNAMENT_DATA.normalMaxBid;
                 const canBidMarquee = nextBidAmount <= TOURNAMENT_DATA.marqueeMaxBid;
                 
                 return (
                   <div key={player.id} className="bg-slate-800 border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row">
                     <div className="md:w-48 h-48 md:h-auto bg-slate-700 relative shrink-0">
                          {player.photoUrl && <img src={player.photoUrl} className="w-full h-full object-cover" />}
                          <div className="absolute top-0 left-0 bg-yellow-400 text-black px-2 py-1 text-xs font-bold">{getPlayerRole(player)}</div>
                     </div>
                     <div className="p-4 flex-1 flex flex-col justify-between">
                       <div>
                          <h3 className="font-bold text-2xl mb-1">{player.name}</h3>
                          <div className="text-xs text-gray-400 mb-3 space-y-1">
                              <p>DOB: {player.dateOfBirth}</p>
                              <div className="flex gap-2"><span>🏏 {player.batsmanHand}</span><span>⚾ {player.bowlerType}</span></div>
                          </div>
                          <div className="bg-black/30 p-2 rounded mb-3 flex justify-between items-center">
                              <span className="text-xs text-gray-400">Current Highest Bid</span>
                              <div className="text-right">
                                  <div className="text-xl font-bold text-green-400">₹{highestBid}</div>
                                  {highestBidderTeam && <div className="text-[10px] text-gray-400">{highestBidderTeam.name}</div>}
                              </div>
                          </div>
                       </div>
                       
                       {/* DYNAMIC BID BUTTONS */}
                       <div className="space-y-2">
                          {canBidNormal ? (
                             <button onClick={() => placeBid(player, nextBidAmount)} className="w-full bg-white/10 hover:bg-yellow-400 hover:text-black py-3 rounded font-bold text-sm transition">
                                Bid ₹{nextBidAmount}
                             </button>
                          ) : (
                             canBidMarquee ? (
                                <button onClick={() => placeBid(player, nextBidAmount)} className="w-full border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white py-3 rounded font-bold text-sm transition flex items-center justify-center gap-2">
                                  <Unlock size={14}/> Marquee Bid ₹{nextBidAmount}
                                </button>
                             ) : (
                                <button disabled className="w-full bg-slate-700 text-gray-500 py-3 rounded font-bold text-sm cursor-not-allowed">
                                  Max Bid Reached
                                </button>
                             )
                          )}
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
             {userRole === 'admin' && <button onClick={finalizeAuction} className="w-full py-4 bg-green-500 font-bold rounded">Finalize Auction Round (Admin)</button>}
          </div>
        )}
      </main>

      {/* SCORECARD MODAL */}
      {scorecardModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4">
           <div className="bg-slate-800 p-6 rounded-xl w-full max-w-lg border border-white/10 max-h-[90vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-yellow-400">MATCH SCORECARD</h3><button onClick={() => setScorecardModal(null)}><X /></button></div>
             <div className="space-y-2">
                {!scorecardModal.scorecard || scorecardModal.scorecard.length === 0 ? <p className="text-center text-gray-500 py-10">No detailed stats added yet.</p> : (
                  scorecardModal.scorecard.map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-black/20 p-3 rounded">
                      <div><div className="font-bold text-sm">{s.name}</div><div className="text-[10px] text-gray-400">{getTeam(s.teamId).name}</div></div>
                      <div className="flex gap-4 text-sm font-mono"><span className="text-yellow-400">{s.runs} Runs</span><span className="text-green-400">{s.wickets} Wkts</span><span className="text-blue-400">{s.overs} Ov</span></div>
                    </div>
                  ))
                )}
             </div>
           </div>
        </div>
      )}

      {/* UPDATE MODAL */}
      {updateModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4">
          <div className="bg-slate-800 p-6 rounded-xl w-full max-w-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 text-center">UPDATE MATCH DETAILS</h3>
            <form onSubmit={handleMatchUpdate} className="space-y-4 mb-8 border-b border-white/10 pb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-3 rounded text-center"><div className="font-bold mb-2 text-yellow-400">{getTeam(updateModal.team1Id).name}</div><input name="s1" type="number" defaultValue={updateModal.team1Score} placeholder="Runs" className="w-full bg-slate-800 p-2 rounded mb-2 text-center" required /><input name="o1" type="number" step="0.1" defaultValue={updateModal.t1_overs} placeholder="Overs" className="w-full bg-slate-800 p-2 rounded text-center" required /></div>
                <div className="bg-slate-900 p-3 rounded text-center"><div className="font-bold mb-2 text-yellow-400">{getTeam(updateModal.team2Id).name}</div><input name="s2" type="number" defaultValue={updateModal.team2Score} placeholder="Runs" className="w-full bg-slate-800 p-2 rounded mb-2 text-center" required /><input name="o2" type="number" step="0.1" defaultValue={updateModal.t2_overs} placeholder="Overs" className="w-full bg-slate-800 p-2 rounded text-center" required /></div>
              </div>
              <div><label className="block text-xs font-bold text-gray-500 mb-2">WINNER</label><select name="winner" defaultValue={updateModal.winner || ""} className="w-full bg-slate-900 p-3 rounded text-white" required><option value="">Select Result...</option><option value={updateModal.team1Id}>{getTeam(updateModal.team1Id).name} Wins</option><option value={updateModal.team2Id}>{getTeam(updateModal.team2Id).name} Wins</option><option value="0">MATCH DRAW</option></select></div>
              <button type="submit" className="w-full bg-green-500 font-bold py-3 rounded">SAVE MAIN SCORE</button>
            </form>
            <div className="space-y-4">
               <h4 className="font-bold text-sm text-gray-400">ADD PLAYER STATS (Scorecard)</h4>
               <div className="flex flex-col gap-2">
                  <select className="bg-slate-900 p-2 rounded" value={scEntry.playerId} onChange={e => setScEntry({...scEntry, playerId: e.target.value})}><option value="">Select Player...</option>{approvedPlayers.filter(r => r.teamId === updateModal.team1Id || r.teamId === updateModal.team2Id).map(r => <option key={r.id} value={r.id}>{r.name} ({getTeam(r.teamId).name})</option>)}</select>
                  <div className="flex gap-2"><input placeholder="Runs" type="number" className="flex-1 bg-slate-900 p-2 rounded" value={scEntry.runs} onChange={e => setScEntry({...scEntry, runs: e.target.value})} /><input placeholder="Wickets" type="number" className="flex-1 bg-slate-900 p-2 rounded" value={scEntry.wickets} onChange={e => setScEntry({...scEntry, wickets: e.target.value})} /><input placeholder="Overs" type="number" className="flex-1 bg-slate-900 p-2 rounded" value={scEntry.overs} onChange={e => setScEntry({...scEntry, overs: e.target.value})} /><button type="button" onClick={addScorecardEntry} className="bg-blue-600 px-4 rounded"><Plus /></button></div>
               </div>
               <div className="space-y-2 mt-4">{(updateModal.scorecard || []).map((s, idx) => <div key={idx} className="flex justify-between items-center bg-black/20 p-2 rounded text-xs"><span>{s.name} ({s.runs}R / {s.wickets}W)</span><button onClick={() => deleteScorecardEntry(s.playerId)} className="text-red-400"><Trash2 size={14}/></button></div>)}</div>
            </div>
            <button type="button" onClick={() => setUpdateModal(null)} className="w-full mt-6 bg-slate-700 py-3 rounded">CLOSE</button>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {loginModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4">
          <div className="bg-slate-800 p-6 rounded-xl w-full max-w-sm border border-white/10">
             <h3 className="text-xl font-bold mb-4 text-center">ACCESS CONTROL</h3>
             <div className="flex bg-slate-900 p-1 rounded mb-4"><button onClick={() => setLoginType('admin')} className={`flex-1 py-2 rounded text-sm font-bold ${loginType === 'admin' ? 'bg-yellow-400 text-black' : 'text-gray-400'}`}>ADMIN</button><button onClick={() => setLoginType('owner')} className={`flex-1 py-2 rounded text-sm font-bold ${loginType === 'owner' ? 'bg-yellow-400 text-black' : 'text-gray-400'}`}>TEAM OWNER</button></div>
             {loginType === 'owner' && <div className="mb-3"><label className="text-xs text-gray-500 font-bold mb-1 block">OWNER ID</label><select className="w-full bg-slate-900 p-3 rounded border border-white/10" value={creds.user} onChange={e => setCreds({...creds, user: e.target.value})}><option value="">Select Team...</option>{teams.map(t => <option key={t.id} value={t.owner}>{t.name}</option>)}</select></div>}
             <div className="mb-6"><label className="text-xs text-gray-500 font-bold mb-1 block">PASSWORD</label><input type="password" className="w-full bg-slate-900 p-3 rounded border border-white/10" value={creds.pass} onChange={e => setCreds({...creds, pass: e.target.value})} /></div>
             <button onClick={handleLogin} className="w-full bg-yellow-400 text-black font-bold py-3 rounded">ENTER SYSTEM</button>
             <button onClick={() => setLoginModal(false)} className="w-full mt-3 text-gray-500 text-sm">CANCEL</button>
          </div>
        </div>
      )}
    </div>
  );
}