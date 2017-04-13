import org.apache.commons.lang.StringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Vasily Akimushkin <vakimushkin@systematic.ru>
 * @since 10/04/2017
 */
public abstract class BasicFmtChecker {

  public static class Result{
    private int amountOfElements;
    private double percentOfCorrect;

    public Result(int amountOfElements, double percentOfCorrect) {
      this.amountOfElements = amountOfElements;
      this.percentOfCorrect = percentOfCorrect;
    }

    public int getAmountOfElements() {
      return amountOfElements;
    }

    public void setAmountOfElements(int amountOfElements) {
      this.amountOfElements = amountOfElements;
    }

    public double getPercentOfCorrect() {
      return percentOfCorrect;
    }

    public void setPercentOfCorrect(double percentOfCorrect) {
      this.percentOfCorrect = percentOfCorrect;
    }
  }


  public abstract Result check(FSM fsm);


  public Result check(String solution) throws ParseException {
    if (!StringUtils.isEmpty(solution)) {
      JSONObject testJson = (JSONObject) new JSONParser().parse(solution);
      FSM fsm = FSM.parse(testJson);
      return check(fsm);
    }else{
      throw new IllegalArgumentException("Empty solution");
    }
  }




  public static class FSM{

    public static final String EMPTY = "#";
    public List<State> states = new ArrayList<>();

    private List<Transition> transitions = new ArrayList<>();

    private State current = null;

    private State initial = null;

    private String out = "";


    private State getStateById(String id){
      for (State state : states) {
        if(id.equals(state.label)){
          return state;
        }
      }
      return null;
    }

    public static FSM parse(JSONObject json) {
      FSM fsm = new FSM();
      State s0=null;
      JSONArray states = (JSONArray) json.get("states");
      for (int i = 0; i < states.size(); i++) {
        JSONObject state = (JSONObject) states.get(i);
        State newState = new State((state.get("final")!=null?(Boolean)state.get("final"):false), (String)state.get("id"));
        fsm.states.add(newState);
        if(state.get("col")!=null){
          newState.setColor((String)state.get("col"));
        }
        if((Boolean)state.get("first")){
          fsm.current=newState;
        }
        if("S0".equals(state.get("label"))){
          s0 = newState;
        }
        if(fsm.current==null && s0!=null){
          fsm.current = s0;
        }
      }
      fsm.initial=fsm.current;
      JSONArray transitions = (JSONArray) json.get("transitions");
      for (int i = 0; i < transitions.size(); i++) {
        JSONObject trans = (JSONObject) transitions.get(i);
        State from = fsm.getStateById((String) trans.get("from"));
        State to = fsm.getStateById((String) trans.get("to"));
        if(from!=null && to!=null){
          Transition transition = new Transition(from, to, (String) trans.get("label"));
          fsm.transitions.add(transition);
          if(trans.get("outlabel")!=null){
            transition.setOutLabel((String)trans.get("outlabel"));
          }
        }
      }
      return fsm;
    }

    public String out(String input) {
      out = "";
      current=initial;
      if(current==null){
        return "";
      }
      char[] chars = input.toCharArray();
      for (int i = 0; i < chars.length; i++) {
        char aChar = chars[i];
        int res = makeTransOut(aChar);
        if(res==-1){
          return "";
        }
        if(res==0){
          i--;
        }
      }
      return out;
    }

    public String calc(String matchedString) {
      current=initial;
      if(current==null){
        return "";
      }
      char[] chars = matchedString.toCharArray();
      for (char aChar : chars) {
        boolean res = makeTrans(aChar);
        if(!res){
          return "";
        }
      }
      return current.color;
    }

    public boolean test(String matchedString) {
      current=initial;
      if(current==null){
        return false;
      }
      char[] chars = matchedString.toCharArray();
      for (char aChar : chars) {
        boolean res = makeTrans(aChar);
        if(!res){
          return false;
        }
      }
      return current.fin;
    }

    private int makeTransOut(char aChar) {
      for (Transition transition : transitions) {
        if(transition.from.equals(current) && ((transition.label.equals(aChar+"")) || transition.label.equals(EMPTY))){
          current=transition.to;
          if(transition.getOutLabel()!=null && !EMPTY.equals(transition.getOutLabel())){
            out+=transition.getOutLabel();
          }
          if(EMPTY.equals(transition.label)){
            return 0;
          }
          return 1;
        }
      }
      return -1;
    }

    private boolean makeTrans(char aChar) {
      for (Transition transition : transitions) {
        if(transition.from.equals(current) && (transition.label.equals(aChar+""))){
          current=transition.to;
          if(transition.getOutLabel()!=null){
            out+=transition.getOutLabel();
          }
          return true;
        }
      }
      return false;
    }


  }

  private static class Transition{
    private State from;
    private State to;
    private String label;

    private String outLabel;


    public Transition(State from, State to, String label) {
      this.from = from;
      this.to = to;
      this.label = label;
    }

    public String getOutLabel() {
      return outLabel;
    }

    public void setOutLabel(String outLabel) {
      this.outLabel = outLabel;
    }

    public State getFrom() {
      return from;
    }

    public void setFrom(State from) {
      this.from = from;
    }

    public State getTo() {
      return to;
    }

    public void setTo(State to) {
      this.to = to;
    }

    public String getLabel() {
      return label;
    }

    public void setLabel(String label) {
      this.label = label;
    }
  }

  private static class State{
    private boolean fin = false;
    private String label;

    private String color;

    public String getColor() {
      return color;
    }

    public void setColor(String color) {
      this.color = color;
    }

    public State(boolean fin, String label) {
      this.fin = fin;
      this.label = label;
    }
  }


}