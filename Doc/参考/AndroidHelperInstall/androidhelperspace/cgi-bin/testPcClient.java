    import java.io.BufferedInputStream;  
    import java.io.BufferedOutputStream;  
    import java.io.BufferedReader;  
    import java.io.ByteArrayOutputStream;  
    import java.io.IOException;  
    import java.io.InputStream;  
    import java.io.InputStreamReader;
    import java.lang.String;
    import java.net.InetAddress;
    import java.net.Socket;  
    import java.net.UnknownHostException;  
      
    public class testPcClient {  
      
        /** 
         * @param args 
         * @throws InterruptedException 
         */  
        public static void main(String[] args) throws InterruptedException {  
            try {  
                Runtime.getRuntime().exec(  
                        "adb shell am startservice -n com.jit.androidhelper/com.jit.androidhelper.AndroidService>/dev/null");
Thread.sleep(1000);  
                Runtime.getRuntime().exec("adb forward tcp:8888 tcp:8888");  
Thread.sleep(1000);
                
            } catch (IOException e3) {  
                e3.printStackTrace();  
            }  
      
            Socket socket = null;
            String line=null;
            try {  
                InetAddress serverAddr = null;  
                serverAddr = InetAddress.getByName("127.0.0.1");  
                socket = new Socket(serverAddr, 8888);  
                BufferedOutputStream out = new BufferedOutputStream(socket  
                        .getOutputStream());
                BufferedReader in =  new BufferedReader(new InputStreamReader(socket.getInputStream()));
              

                        out.write(args[0].getBytes());  
                        out.flush();
                    while ((line = in.readLine()) != null) {
                    System.out.print(line);
                        if(line.indexOf("::OK")>0)
                            break;
                    }

            } catch (UnknownHostException e1) {  
            } catch (Exception e2) {  
            } finally {  
                    if (socket != null) {
                        try {
                            socket.close();
                        }
                        catch (IOException e){}
                    }

                }   
            }  

    }  
