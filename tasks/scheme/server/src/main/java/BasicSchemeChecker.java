import org.apache.commons.lang.StringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Vasily Akimushkin <vakimushkin@systematic.ru>
 * @since 10/04/2017
 */
public abstract class BasicSchemeChecker {

  public static class Result{
    private int amountOfElements;
    private double percentOfCerrect;

    public Result(int amountOfElements, double percentOfCerrect) {
      this.amountOfElements = amountOfElements;
      this.percentOfCerrect = percentOfCerrect;
    }

    public int getAmountOfElements() {
      return amountOfElements;
    }

    public void setAmountOfElements(int amountOfElements) {
      this.amountOfElements = amountOfElements;
    }

    public double getPercentOfCerrect() {
      return percentOfCerrect;
    }

    public void setPercentOfCerrect(double percentOfCerrect) {
      this.percentOfCerrect = percentOfCerrect;
    }
  }

  public abstract String getConfig();

  public abstract boolean[][][] getTests();

  public Result check(String solution) throws ParseException {

    JSONObject configJson = (JSONObject) new JSONParser().parse(getConfig());
    if (!StringUtils.isEmpty(solution)) {
      JSONObject testJson = (JSONObject) new JSONParser().parse(solution);
      Logic scheme = Logic.parse(configJson, testJson);

      boolean[][][] tests = getTests();
      int correctCount = 0;
      for (int i = 0; i < tests.length; i++) {
        boolean[][] test = tests[i];
        correctCount+= scheme.check(test[0], test[1]);
      }
      return new Result(scheme.elements.length, correctCount*1.0 / (tests.length*tests[0][1].length));
    }else{
      throw new IllegalArgumentException("Empty solution");
    }
  }

  private boolean compare(Boolean[] etalonResult, Boolean[] testResult) {
    for (int i = 0; i < etalonResult.length; i++) {
      if (etalonResult[i] != testResult[i]) {
        return false;
      }
    }
    return true;
  }


  public static class Logic {

    private final int MAX_STEPS = 500;

    private Base[] bases;

    private Element[] elements;

    private Connector[] outputs;

    private Connector[] inputs;

    private ScriptEngine engine;


    public int check(boolean[] inputValues, boolean[] outputValues) {
      for (Connector output : outputs) {
        output.value = null;
      }

      for (Connector input : inputs) {
        input.value = null;
      }

      for (Element element : elements) {
        for (Connector connector : element.inputs) {
          connector.value = null;
        }
        for (Connector connector : element.outputs) {
          connector.value = null;
        }
      }

      List<Connector> connectors = new ArrayList<>();
      for (Connector connector : outputs) {
        connectors.add(connector);
      }

      for (int i = 0; i < outputs.length; i++) {
        Connector output = outputs[i];
        output.value = inputValues[i];
      }

      for (int i = 0; i < MAX_STEPS && !connectors.isEmpty(); i++) {
        List<Connector> inps = new ArrayList<>();
        for (Connector connector : connectors) {
          for (Connector inp : connector.inputs) {
            inp.value = connector.value;
            inps.add(inp);
          }
        }
        connectors.clear();
        for (Connector inp : inps) {
          if (inp.element != null) {
            if (inp.element.calc(engine)) {
              for (Connector connector : inp.element.outputs) {
                connectors.add(connector);
              }
            }
          }
        }
      }


      int result = 0;

      for (int i = 0; i < inputs.length; i++) {
        if(inputs[i].value!=null && outputValues[i]==inputs[i].value){
          result++;
        }
      }
      return result;
    }

    public static Logic parse(JSONObject config, JSONObject json) {
      Logic logic = new Logic();
      ScriptEngineManager factory = new ScriptEngineManager();
      logic.engine = factory.getEngineByName("JavaScript");
      JSONArray array = (JSONArray) config.get("bases");
      logic.bases = new Base[array.size()];

      for (int i = 0; i < array.size(); i++) {
        JSONObject baseJson = (JSONObject) array.get(i);
        Base base = new Base(Integer.parseInt((String) baseJson.get("id")), ((Long) baseJson.get("inputNum")), ((Long) baseJson.get("outputNum")), (String) baseJson.get("func"));
        logic.bases[i] = base;
      }

      int inputNum = Math.round((Long) config.get("outputNum"));
      int outputNum = Math.round((Long) config.get("inputNum"));
      logic.inputs = new Connector[inputNum];
      logic.outputs = new Connector[outputNum];
      for (int i = 0; i < inputNum; i++) {
        logic.inputs[i] = new Connector(null);
      }
      for (int i = 0; i < outputNum; i++) {
        logic.outputs[i] = new Connector(null);
      }

      JSONArray arrayElements = (JSONArray) json.get("elements");
      logic.elements = new Element[arrayElements.size()];
      for (int i = 0; i < arrayElements.size(); i++) {
        JSONObject jsonElement = (JSONObject) arrayElements.get(i);
        Element element = new Element(((Long) jsonElement.get("id")), logic.getBaseById(Integer.parseInt((String) jsonElement.get("base"))));
        logic.elements[i] = element;
      }

      JSONArray arrayConnections = (JSONArray) json.get("connections");
      for (int i = 0; i < arrayConnections.size(); i++) {
        JSONObject jsonConnection = (JSONObject) arrayConnections.get(i);
        int fromIndex = Math.round((Long) jsonConnection.get("from"));
        Long fromElementLong = (Long) jsonConnection.get("fromelement");
        int fromElement = 0;
        if (fromElementLong != null) {
          fromElement = Math.round(fromElementLong);
        }
        int toIndex = Math.round((Long) jsonConnection.get("to"));
        Long toElementLong = (Long) jsonConnection.get("toelement");
        int toElement = 0;
        if (toElementLong != null) {
          toElement = Math.round(toElementLong);
        }
        Connector from = fromElementLong == null ? logic.outputs[fromIndex] : logic.getElementById(fromElement).outputs[fromIndex];
        Connector to = toElementLong == null ? logic.inputs[toIndex] : logic.getElementById(toElement).inputs[toIndex];
        from.inputs.add(to);
      }

      return logic;
    }

    public Base getBaseById(long id) {
      for (Base base : bases) {
        if (base.id == id) {
          return base;
        }
      }
      return null;
    }

    public Element getElementById(long id) {
      for (Element element : elements) {
        if (element.id == id) {
          return element;
        }
      }
      return null;
    }


    public static class Connector {
      private Element element;
      private List<Connector> inputs = new ArrayList<>();
      private Boolean value = null;

      public Connector(Element element) {
        this.element = element;
      }
    }

    public static class Element {
      private long id;
      private Base base;
      private Connector[] inputs;
      private Connector[] outputs;

      public Element(long id, Base base) {
        this.id = id;
        this.base = base;
        int inputNum = Math.round(base.inputs);
        inputs = new Connector[inputNum];
        int outputNum = Math.round(base.outputs);
        outputs = new Connector[outputNum];
        for (int i = 0; i < inputNum; i++) {
          inputs[i] = new Connector(this);
        }
        for (int i = 0; i < outputNum; i++) {
          outputs[i] = new Connector(this);
        }

      }

      public boolean calc(ScriptEngine engine) {
        for (Connector connector : inputs) {
          if (connector.value == null) {
            return false;
          }
        }

        boolean[] input = new boolean[inputs.length];
        for (int i = 0; i < inputs.length; i++) {
          input[i] = inputs[i].value;
        }

        boolean[] output = new boolean[outputs.length];

        engine.put("input", input);
        engine.put("output", output);

        try {
          engine.eval(base.func);
        } catch (ScriptException e) {
          e.printStackTrace();
        }

        for (int i = 0; i < output.length; i++) {
          outputs[i].value = output[i];
        }

        return true;
      }
    }

    public static class Base {
      private long id;
      private long inputs;
      private long outputs;
      private String func;

      public Base(long id, long inputs, long outputs, String func) {
        this.id = id;
        this.inputs = inputs;
        this.outputs = outputs;
        this.func = func;
      }
    }

  }

}