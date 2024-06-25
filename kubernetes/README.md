Certainly! Here are some commonly used `kubectl` commands when working with Minikube:

1. **Start Minikube:**
   ```
   minikube start
   ```

2. **Stop Minikube:**
   ```
   minikube stop
   ```

3. **Delete Minikube cluster:**
   ```
   minikube delete
   ```

4. **Get cluster information:**
   ```
   kubectl cluster-info
   ```

5. **Get nodes in the cluster:**
   ```
   kubectl get nodes
   ```

6. **Get pods:**
   ```
   kubectl get pods
   ```

7. **Get deployments:**
   ```
   kubectl get deployments
   ```

8. **Get services:**
   ```
   kubectl get services
   ```

9. **Get logs from a specific pod:**
   ```
   kubectl logs <pod-name>
   ```

10. **Describe a resource (pod, service, deployment, etc.):**
    ```
    kubectl describe <resource-type> <resource-name>
    ```

11. **Execute a command in a running container:**
    ```
    kubectl exec -it <pod-name> -- <command>
    ```

12. **Port forward to a pod:**
    ```
    kubectl port-forward <pod-name> <local-port>:<pod-port>
    ```

13. **Apply a YAML file to create or update resources:**
    ```
    kubectl apply -f <filename.yaml>
    ```

14. **Delete a resource:**
    ```
    kubectl delete <resource-type> <resource-name>
    ```

15. **Scale a deployment:**
    ```
    kubectl scale --replicas=<new-replica-count> deployment/<deployment-name>
    ```

16. **Get detailed resource usage information:**
    ```
    kubectl top <resource-type>
    ```

16. **Get detailed information about a specific resource:**
   ```
   kubectl describe <resource-type> <resource-name>
   ```

17. **Get detailed information about all resources in a namespace:**
   ```
   kubectl describe <resource-type> --namespace <namespace-name>
   ```

18. **Create or update resources from a directory containing YAML files:**
   ```
   kubectl apply -f <directory-path>
   ```

19. **Get the logs from multiple pods at once:**
   ```
   kubectl logs -l <label-selector>
   ```

20. **Get the events in the cluster:**
   ```
   kubectl get events
   ```

21. **Get the status of a specific resource:**
   ```
   kubectl get <resource-type> <resource-name> -o jsonpath='{.status.phase}'
   ```

22. **Create a new namespace:**
   ```
   kubectl create namespace <namespace-name>
   ```

23. **Switch to a different namespace:**
   ```
   kubectl config set-context --current --namespace=<namespace-name>
   ```

24. **Get the status of all resources in a namespace:**
   ```
   kubectl get all --namespace <namespace-name>
   ```

25. **Expose a deployment as a service:**
    ```
    kubectl expose deployment <deployment-name> --type=NodePort --port=<port-number>
    ```

26. **Get the external IP address of a service:**
    ```
    minikube service <service-name> --url
    ```

27. **Execute a command in a container of a pod:**
    ```
    kubectl exec -it <pod-name> -- <command>
    ```

28. **Create a secret from literal values:**
    ```
    kubectl create secret generic <secret-name> --from-literal=<key>=<value>
    ```

29. **Create a ConfigMap from literal values:**
    ```
    kubectl create configmap <configmap-name> --from-literal=<key>=<value>
    ```

30. **Get information about installed Kubernetes API resources:**
    ```
    kubectl api-resources
    ```

These commands should help you perform common tasks and interact with your Minikube cluster using `kubectl`. Remember to replace `<pod-name>`, `<resource-type>`, `<resource-name>`, and other placeholders with the actual names and values relevant to your setup.

These additional commands should help you further manage and interact with your Minikube cluster using `kubectl`. Remember to replace `<resource-type>`, `<resource-name>`, `<label-selector>`, and other placeholders with the actual names and values relevant to your configuration.